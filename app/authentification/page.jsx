"use client"

import { useState } from "react";
import AuthForm from "@/components/authentification";
import Image from "next/image";
import logo from "@/public/logo_BonGout.png";
import styles from "./authentification.module.css";

export default function Contact() {
    return<> 

    <Image src={logo} alt="Logo Spectacite" className={styles.logo} />
    <AuthForm/>
    </>
   
}