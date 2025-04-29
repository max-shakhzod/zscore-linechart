import { FC, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  DotProps,
} from 'recharts';
import { calculateZScore } from '../utils/calculateZScore';

const dotStyles = {
  pv: {
    color: '#8884d8',
    zScoreKey: 'zScorePv',
  },
  uv: {
    color: '#82ca9d',
    zScoreKey: 'zScoreUv',
  },
} as const;

type DataKeyType = keyof typeof dotStyles;

interface DataItem {
  name: string;
  pv: number;
  uv: number;
  zScorePv?: number;
  zScoreUv?: number;
}

interface CustomDotProps extends DotProps {
  payload?: DataItem;
  dataKey: DataKeyType;
}

const CustomDot: FC<CustomDotProps> = ({ cx, cy, payload, dataKey }) => {
  if (!payload || cx == null || cy == null) return null;

  const { color, zScoreKey } = dotStyles[dataKey];
  const zScore = payload[zScoreKey as keyof DataItem];
  const isRed = typeof zScore === 'number' && Math.abs(zScore) > 1;

  return (
    <circle
      cx={Number(cx)}
      cy={Number(cy)}
      r={4}
      fill={isRed ? 'red' : color}
    />
  );
};

const renderCustomDot = (dataKey: DataKeyType) => (props: DotProps) => {
  const { key, ...rest } = props as CustomDotProps;
  return <CustomDot key={key} {...rest} dataKey={dataKey} />;
};

const data: DataItem[] = [
  { name: 'Page A', uv: 4000, pv: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398 },
  { name: 'Page C', uv: 1000, pv: 9800 },
  { name: 'Page D', uv: 2780, pv: 3908 },
  { name: 'Page E', uv: 1890, pv: 4800 },
  { name: 'Page F', uv: 2390, pv: 3800 },
  { name: 'Page G', uv: 3490, pv: 4300 },
];

const ZScoreLineChart: FC = () => {
  const processedData = useMemo(() => calculateZScore(data), []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={processedData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        {Object.keys(dotStyles).map((key) => {
          const dataKey = key as DataKeyType;
          const { color } = dotStyles[dataKey];

          return (
            <Line
              key={dataKey}
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              dot={renderCustomDot(dataKey)}
              strokeDasharray="3 3"
              isAnimationActive={false}
            />
          );
        })}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ZScoreLineChart;
