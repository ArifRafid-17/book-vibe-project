"use client";
import { booksContext } from "@/src/Context/BooksContext";
import React, { useContext } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  BarShapeProps,
  LabelList,
  Label,
  LabelProps,
  Tooltip,
} from "recharts";
import { BookType } from "../types";

const ReadBooks = () => {
  const { readBooks } = useContext(booksContext) as {
    readBooks: BookType[];
  };

  const data = readBooks.map((book: BookType, index: number) => ({
    name: book.bookName,
    uv: book.totalPages,
    pv: index + 1,
    amt: index + 1,
  }));

  // Y-axis: 5 evenly spaced ticks (00, 85, 170, 255, 340 like the design).
  // Grows automatically if a book has more than 340 pages.
  const maxPages = Math.max(340, ...data.map((d) => d.uv));
  const step = Math.ceil(maxPages / 4);
  const ticks = [0, 1, 2, 3, 4].map((i) => i * step);

  // Spike shape: wide base, concave sides, sharp tip
  const getPath = (x: number, y: number, width: number, height: number) => {
    return `M${x},${y + height}C${x + width * 0.4},${y + height} ${x + width / 2},${y + height * 0.45}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height * 0.45} ${x + width * 0.6},${y + height} ${x + width}, ${y + height}
  Z`;
  };

  const colors = ["#2B7FFF", "#26C19A", "#F8B739", "#F77F4B", "#F5001D"];

  const TriangleBar = (props: BarShapeProps) => {
    const { x, y, width, height, index } = props;

    const color = colors[index % colors.length];

    return (
      <path
        strokeWidth={props.isActive ? 5 : 0}
        d={getPath(Number(x), Number(y), Number(width), Number(height))}
        stroke={color}
        fill={color}
        style={{
          transition: "stroke-width 0.3s ease-out",
        }}
      />
    );
  };

  const CustomColorLabel = (props: LabelProps) => {
    const fill = colors[(props.index ?? 0) % colors.length];
    return <Label {...props} fill={fill} fontSize={12} fontWeight={600} />;
  };

  //   const data = [
  //     {
  //       name: "Page A",
  //       uv: 4000,
  //       pv: 2400,
  //       amt: 2400,
  //     },
  //     {
  //       name: "Page B",
  //       uv: 3000,
  //       pv: 1398,
  //       amt: 2210,
  //     },
  //     {
  //       name: "Page C",
  //       uv: 2000,
  //       pv: 9800,
  //       amt: 2290,
  //     },
  //     {
  //       name: "Page D",
  //       uv: 2780,
  //       pv: 3908,
  //       amt: 2000,
  //     },
  //     {
  //       name: "Page E",
  //       uv: 1890,
  //       pv: 4800,
  //       amt: 2181,
  //     },
  //     {
  //       name: "Page F",
  //       uv: 2390,
  //       pv: 3800,
  //       amt: 2500,
  //     },
  //     {
  //       name: "Page G",
  //       uv: 3490,
  //       pv: 4300,
  //       amt: 2100,
  //     },
  //   ];

  return (
    <div className="container mx-auto my-5 px-4">
      {readBooks.length > 0 ? (
        <div className="bg-[#F8F8F8] rounded-2xl p-6 sm:p-10 max-w-5xl mx-auto">
          <BarChart
            style={{
              width: "100%",
              maxHeight: "70vh",
              aspectRatio: 1.8,
            }}
            responsive
            data={data}
            barSize={80}
            margin={{
              top: 30,
              right: 20,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="4 4" stroke="#DADADA" />
            <Tooltip cursor={{ fillOpacity: 0.5 }} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9A9A9A", fontSize: 12 }}
              tickMargin={12}
            />
            <YAxis
              width="auto"
              domain={[0, step * 4]}
              ticks={ticks}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9A9A9A", fontSize: 12 }}
              tickFormatter={(v: number) => (v === 0 ? "00" : String(v))}
            />
            <Bar dataKey="uv" shape={TriangleBar} activeBar>
              <LabelList content={CustomColorLabel} position="top" />
            </Bar>
            {/* <RechartsDevtools /> */}
          </BarChart>
        </div>
      ) : (
        <p className="text-center text-gray-500">No read books to display.</p>
      )}
    </div>
  );
};

export default ReadBooks;