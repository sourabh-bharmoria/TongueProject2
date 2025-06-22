"use client";

import React from "react";
import { ContainerScroll } from "./ui/container-scroll-animation";
import { HeroSection } from "./HeroSection";
import Image from "next/image";

export function ScrollResult() {
    return (
        <div className="flex flex-col overflow-hidden">
            <ContainerScroll
                titleComponent={
                    <>
                        <h1 className="text-4xl font-semibold text-black">
                            See what your tongue reveals about your health with
                        </h1>
                        <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                            AI Precision!
                        </span>
                    </>
                }
            >
                <Image
                    src={`/result.png`}
                    alt="hero"
                    height={720}
                    width={1400}
                    className="mx-auto rounded-2xl object-cover h-full object-center"
                    draggable={false}
                />
            </ContainerScroll>
        </div>
    );
}
