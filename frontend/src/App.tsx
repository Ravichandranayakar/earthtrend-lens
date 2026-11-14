import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { DeseasonalizerChart } from './components/DeseasonalizerChart';
import { ForensicScorecard } from './components/ForensicScorecard';
import { SpatialPolarityCard } from './components/SpatialPolarityCard';
import {
  fetchPresets,
  fetchOppositeTrends,
  PresetCase,
  OppositeTrendsResponse,
} from './services/api';
import { AlertCircle, RefreshCw } from 'lucide-react';

export function App() {
  const [presets, setPresets] = useState<PresetCase[]>([]);
  const [selectedPresetId, setSelectedPresetId] = useState<string>('case_01_europe');
  const [analysisData, setAnalysisData] = useState<OppositeTrendsResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Initial load
  useEffect(() => {
    async function init() {
      try {
        setIsLoading(true);
        const presetList = await fetchPresets();
        setPresets(presetList);

        // Load default preset (Case 1: Europe Hydrology)
        const initialData = await fetchOppositeTrends('case_01_europe');
        setAnalysisData(initialData);
        setError(null);
      } catch (err: any) {
        console.error('Failed to initialize EarthTrend Lens:', err);
        setError(
          'Could not connect to FastAPI Backend at http://localhost:8000. Ensure the backend server is running.'
        );
      } finally {
        setIsLoading(false);
      }
    }
    init();
  }, []);

  const handleSelectPreset = async (presetId: string) => {
    setSelectedPresetId(presetId);
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchOppositeTrends(presetId);
      setAnalysisData(data);
    } catch (err: any) {
      console.error('Failed to fetch preset analysis:', err);
      setError(`Failed to retrieve data for ${presetId}.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar
        presets={presets}
        selectedPresetId={selectedPresetId}
        onSelectPreset={handleSelectPreset}
        isLoading={isLoading}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 flex flex-col gap-6">
        {/* Error Notification */}
        {error && (
          <div className="bg-red-950/40 border border-red-800 rounded-xl p-4 flex items-center justify-between text-red-300 text-sm">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={() => handleSelectPreset(selectedPresetId)}
              className="px-3 py-1 bg-red-900/60 hover:bg-red-800 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Retry
            </button>
          </div>
        )}

        {/* Diagnostic Polarity Header Card */}
        {analysisData && <SpatialPolarityCard data={analysisData} />}

        {/* Central Visualization: The Synchronized Divergent Chart */}
        {analysisData && <DeseasonalizerChart data={analysisData} />}

        {/* Forensic Scorecards: Dual Region Side-by-Side Verification */}
        {analysisData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ForensicScorecard
              region={analysisData.region_a}
              colorTheme="crimson"
            />
            <ForensicScorecard
              region={analysisData.region_b}
              colorTheme="teal"
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 px-6 py-4 text-xs text-slate-500 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            Built by <strong>Team Synqora</strong> for{' '}
            <span className="text-teal-400">NASA Space Apps Challenge 2026</span>
          </div>
          <div>
            Powered by NASA GES DISC (GLDAS Noah 2.1) & NASA Langley (POWER MERRA-2)
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
