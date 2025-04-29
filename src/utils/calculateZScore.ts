interface DataPoint {
    name: string;
    pv: number;
    uv: number;
    zScorePv?: number;
    zScoreUv?: number;
  }
  
  export const calculateZScore = (data: DataPoint[]): DataPoint[] => {
    const getMean = (arr: number[]) => arr.reduce((sum, val) => sum + val, 0) / arr.length;
    const getStdDev = (arr: number[], mean: number) =>
      Math.sqrt(arr.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / arr.length);
  
    const pvValues = data.map((d) => d.pv);
    const uvValues = data.map((d) => d.uv);
  
    const meanPv = getMean(pvValues);
    const meanUv = getMean(uvValues);
    const stdDevPv = getStdDev(pvValues, meanPv);
    const stdDevUv = getStdDev(uvValues, meanUv);
  
    return data.map((d) => ({
      ...d,
      zScorePv: stdDevPv !== 0 ? (d.pv - meanPv) / stdDevPv : 0,
      zScoreUv: stdDevUv !== 0 ? (d.uv - meanUv) / stdDevUv : 0,
    }));
  };
  