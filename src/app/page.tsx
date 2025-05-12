"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { Button } from "@/components/ui/button";
import AppSidebar from "@/components/Sidebar/Sidebar";
import { use, useEffect } from "react";
import { useUser } from "@/context/user-context";

export default function Home() {
  

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}
