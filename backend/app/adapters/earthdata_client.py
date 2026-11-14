import os
from pathlib import Path
from typing import Dict, Any, List, Optional
import earthaccess

from app.core.config import settings

class EarthdataClient:
    """
    Client for NASA Earthdata Cloud and GES DISC granule discovery and retrieval.
    Product: GLDAS_NOAH025_M (Version 2.1)
    """

    def __init__(self):
        self.data_dir = settings.BASE_DIR / "app" / "data" / "gldas"
        self.data_dir.mkdir(parents=True, exist_ok=True)

    def get_auth_status(self) -> Dict[str, Any]:
        """Checks if Earthdata credentials exist in environment or backend/.env."""
        token = os.environ.get("EARTHDATA_TOKEN")
        username = os.environ.get("EARTHDATA_USERNAME")
        password = os.environ.get("EARTHDATA_PASSWORD")

        has_token = bool(token and len(token.strip()) > 10)
        has_credentials = bool(username and password)

        return {
            "has_token": has_token,
            "has_credentials": has_credentials,
            "username": username if has_credentials else None,
            "is_configured": has_token or has_credentials
        }

    def search_granules(
        self,
        bbox: Optional[List[float]] = None,
        start_year: int = 2023,
        end_year: int = 2023,
        count: int = 12
    ) -> List[Dict[str, Any]]:
        """
        Queries NASA CMR anonymously for real GLDAS_NOAH025_M.2.1 granules.
        """
        temporal = (f"{start_year}-01-01", f"{end_year}-12-31")
        
        # Search via earthaccess
        kwargs: Dict[str, Any] = {
            "short_name": "GLDAS_NOAH025_M",
            "version": "2.1",
            "temporal": temporal,
            "count": count
        }
        if bbox and len(bbox) == 4:
            # earthaccess bbox format: (min_lon, min_lat, max_lon, max_lat)
            min_lat, max_lat, min_lon, max_lon = bbox
            kwargs["bounding_box"] = (min_lon, min_lat, max_lon, max_lat)

        try:
            results = earthaccess.search_data(**kwargs)
            granules = []
            for r in results:
                granule_ur = r["umm"].get("GranuleUR", "")
                download_urls = [
                    link.get("URL")
                    for link in r["umm"].get("RelatedUrls", [])
                    if link.get("Type") == "GET DATA"
                ]
                granules.append({
                    "granule_ur": granule_ur,
                    "concept_id": r["meta"].get("concept-id"),
                    "temporal": r["umm"].get("TemporalExtent"),
                    "download_url": download_urls[0] if download_urls else None,
                    "size_mb": round(float(r["umm"].get("DataGranule", {}).get("ArchiveAndDistributionInformation", [{}])[0].get("SizeInBytes", 0)) / (1024 * 1024), 2)
                })
            return granules
        except Exception as e:
            return []

    def download_granules(
        self,
        start_year: int = 2023,
        end_year: int = 2023,
        limit: int = 3
    ) -> Dict[str, Any]:
        """
        Attempts to authenticate and download requested GLDAS granules into app/data/gldas/.
        """
        auth_status = self.get_auth_status()
        if not auth_status["is_configured"]:
            return {
                "status": "AUTH_REQUIRED",
                "message": (
                    "NASA Earthdata authentication required for automated NetCDF retrieval. "
                    "Please configure EARTHDATA_TOKEN or EARTHDATA_USERNAME in backend/.env, "
                    "or manually place downloaded GLDAS_NOAH025_M.2.1 .nc4 files into backend/app/data/gldas/."
                ),
                "token_generation_url": "https://urs.earthdata.nasa.gov/users/ravichandar/user_tokens",
                "archive_directory": str(self.data_dir)
            }

        try:
            # Login using environment token or user/pass
            earthaccess.login(strategy="environment")
            
            # Search granules
            results = earthaccess.search_data(
                short_name="GLDAS_NOAH025_M",
                version="2.1",
                temporal=(f"{start_year}-01-01", f"{end_year}-12-31"),
                count=limit
            )

            if len(results) == 0:
                return {
                    "status": "NOT_FOUND",
                    "message": f"No GLDAS granules found for temporal range {start_year}-{end_year}."
                }

            # Download to local data folder
            downloaded = earthaccess.download(results, str(self.data_dir))
            downloaded_paths = [str(p) for p in downloaded]

            return {
                "status": "SUCCESS",
                "downloaded_count": len(downloaded_paths),
                "files": downloaded_paths,
                "target_directory": str(self.data_dir)
            }
        except Exception as e:
            return {
                "status": "ERROR",
                "message": f"Earthdata download failed: {str(e)}",
                "hint": "Verify that your Earthdata account has authorized 'NASA GESDISC DATA ARCHIVE' in URS profile applications."
            }
