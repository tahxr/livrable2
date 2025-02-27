import Descreption from "@/components/Descreption"
import styles from '@/app/page.module.css'
import Image from "next/image";
import concert1 from "@/public/concert1.jpg"
import concert2 from "@/public/concert2.jpg"
import concert3 from "@/public/concert3.jpg"

export default function Concerts() {
    return <>
        <Descreption titre="Concert Rock et Jazz">
            Plongez dans une soirée inoubliable avec des artistes exceptionnels de la scène rock et jazz.
            Découvrez des performances live, des improvisations et une énergie électrique !
            <p><strong>Date :</strong> 15 mars 2025</p>
            <p><strong>Heure :</strong> 20h00</p>
        </Descreption>
        
        <div className={styles.imagegallery}>
            <Image src={concert1} alt="Image scene en jpg" />
            <Image src={concert2} alt="Image scene en jpg" />
            <Image src={concert3} alt="Image scene en jpg" />
        </div>
    </>
}