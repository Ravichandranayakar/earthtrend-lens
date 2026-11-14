from abc import ABC, abstractmethod
from typing import Dict, Any, List

class BaseDatasetAdapter(ABC):
    """
    Abstract interface for Earth science dataset connectors.
    Enforces standardized retrieval and unit harmonization.
    """
    
    @abstractmethod
    def get_metadata(self) -> Dict[str, Any]:
        """Returns dataset provenance, provider, DOI, and variable dictionary."""
        pass

    @abstractmethod
    def fetch_regional_timeseries(
        self,
        bbox: List[float],
        start_year: int,
        end_year: int,
        variable: str
    ) -> Dict[str, Any]:
        """
        Retrieves a spatially averaged time series over the specified bounding box.
        bbox: [min_lat, max_lat, min_lon, max_lon]
        Returns:
            Dict containing dates, values, units, and spatial coverage stats.
        """
        pass
