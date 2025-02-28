"use client";
import React, { useEffect, useState, createContext } from "react";
import { SessionProvider } from "next-auth/react";

export default function AllProvider({ children, session }) {


  return (
    <>
      <SessionProvider session={session}>
        {children}
      </SessionProvider>
      
    </>
  );
}
