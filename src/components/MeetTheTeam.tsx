"use client";

import React from "react";
import {
    DraggableCardBody,
    DraggableCardContainer,
} from "@/components/ui/draggable-card";

export function MeetTheTeam() {
    const items = [
        {
            title: "Sindhuja Reddy",
            image: "/six.png",
            className: "absolute top-40 left-[25%] rotate-[-7deg]",
            rollNo: "B21158",
        },
        {
            title: "Jay Shorey",
            image: "/five.png",
            className: "absolute top-40 left-[25%] rotate-[-7deg]",
            rollNo: "B21251",
        },
        {
            title: "Abhinav Arya",
            image: "/four.png",
            className: "absolute top-5 left-[40%] rotate-[8deg]",
            rollNo: "B21001",
        },
        {
            title: "Jagadeesh Rachapudi",
            image: "/three.png",
            className: "absolute top-32 left-[55%] rotate-[10deg]",
            rollNo: "S23096",
        },
        {
            title: "Vikas Sharma",
            image: "/two.png",
            className: "absolute top-32 left-[55%] rotate-[10deg]",
            rollNo: "S23117",
        },

        {
            title: "Jagannath Prasad Sahoo",
            image: "/one.png",
            className: "absolute top-10 left-[20%] rotate-[-5deg]",
            rollNo: "S23118",
        },
    ];
    return (
        <DraggableCardContainer className="relative flex min-h-screen w-full items-center justify-center overflow-clip">
            <p className="absolute top-1/2 mx-auto max-w-sm -translate-y-3/4 text-center text-2xl font-black text-neutral-400 md:text-4xl dark:text-neutral-800">
                Tongue Diagnostics's Team
            </p>
            {items.map((item) => (
                <DraggableCardBody className={item.className} key={item.title}>
                    <img
                        src={item.image}
                        alt={item.title}
                        className="pointer-events-none relative z-10 h-80 w-80 object-cover border-2 "
                    />
                    <h3 className="mt-4 text-center text-2xl font-bold text-neutral-700 dark:text-neutral-300">
                        {item.title}
                    </h3>
                    <p className="text-sm text-gray-400">{item.rollNo}</p>
                </DraggableCardBody>
            ))}
        </DraggableCardContainer>
    );
}
