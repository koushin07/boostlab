/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link?: string;
    icon?: React.ComponentType<{ className?: string }>;
    step?: string;
    color?: string;
    bgColor?: string;
    borderColor?: string;
    features?: string[];
  }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10 gap-4",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={idx}
          className="relative group block p-4 h-full w-full -m-2"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-2 h-[calc(100%-1rem)] w-[calc(100%-1rem)] bg-gradient-to-br from-slate-800/90 to-slate-900/90 block rounded-3xl backdrop-blur-sm"
                layoutId="hoverBackground"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: {
                    duration: 0.25,
                    ease: "easeOut",
                  },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.95,
                  transition: {
                    duration: 0.2,
                    delay: 0.05,
                    ease: "easeIn",
                  },
                }}
                style={{
                  background:
                    item.bgColor ||
                    "linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.9))",
                }}
              />
            )}
          </AnimatePresence>
          <Card
            className={`${
              item.borderColor || "border-slate-700/50"
            } border transition-all duration-300 group-hover:border-opacity-80 group-hover:shadow-xl group-hover:shadow-black/20 m-2`}
          >
            <GameCard item={item} />
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden backdrop-blur-sm relative z-10 bg-transparent",
        className
      )}
    >
      <div className="relative z-20 h-full">
        <div className="p-4 h-full">{children}</div>
      </div>
    </div>
  );
};

export const GameCard = ({ item }: { item: any }) => {
  const IconComponent = item.icon;

  return (
    <div className="text-center h-full flex flex-col relative z-30">
      {/* Step Icon */}
      <div className="flex items-center justify-center mb-6">
        <motion.div
          className={`w-16 h-16 bg-gradient-to-br ${
            item.color || "from-blue-500 to-purple-600"
          } rounded-full flex items-center justify-center relative shadow-lg`}
          whileHover={{
            scale: 1.1,
            rotate: 5,
            transition: { duration: 0.2, ease: "easeOut" },
          }}
          whileTap={{ scale: 0.95 }}
        >
          {IconComponent && (
            <motion.div
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.2 },
              }}
            >
              <IconComponent className="h-8 w-8 text-white" />
            </motion.div>
          )}
          {item.step && (
            <motion.div
              className="absolute -top-2 -right-2 w-8 h-8 bg-slate-800 border-2 border-white rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg"
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.2 },
              }}
            >
              {item.step}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <motion.h3
          className="text-xl md:text-2xl font-bold mb-4 text-white transition-colors duration-300 group-hover:text-sky-400"
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.2 },
          }}
        >
          {item.title}
        </motion.h3>
        <motion.p
          className="text-gray-400 group-hover:text-gray-200 transition-colors duration-300 mb-6 leading-relaxed flex-1"
          whileHover={{
            y: -2,
            transition: { duration: 0.2 },
          }}
        >
          {item.description}
        </motion.p>

        {/* Features */}
        {item.features && (
          <div className="space-y-3 mt-auto">
            {item.features.map((feature: string, featureIndex: number) => (
              <motion.div
                key={featureIndex}
                className="flex items-center justify-center gap-3 text-sm text-gray-300 group-hover:text-gray-100 transition-colors duration-300"
                initial={{ opacity: 0, x: -10 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: {
                    delay: featureIndex * 0.1,
                    duration: 0.3,
                  },
                }}
                whileHover={{
                  x: 5,
                  transition: { duration: 0.2 },
                }}
              >
                <motion.div
                  className={`w-2 h-2 bg-gradient-to-r ${
                    item.color || "from-blue-400 to-purple-500"
                  } rounded-full shadow-sm`}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: featureIndex * 0.3,
                  }}
                />
                <span className="font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
