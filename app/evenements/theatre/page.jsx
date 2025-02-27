import Descreption from "@/components/Descreption"
import styles from '@/app/page.module.css'
import Image from "next/image";

import theatre1 from "@/public/theatre1.jpg"
import theatre2 from "@/public/theatre2.jpg"
import theatre3 from "@/public/theatre3.jpg"
export default function Theatre() {
    return <>
        <Descreption titre="Théâtre - Une pièce captivante">
            Venez assister à une performance théâtrale exceptionnelle, où des acteurs talentueux donnent vie à une intrigue captivante.
            Une expérience émotive à ne pas manquer !
            <p><strong>Date :</strong> 20 avril 2025</p>
            <p><strong>Heure :</strong> 18h30</p>

        </Descreption>
        <div className={styles.imagegallery}>
            <Image src={theatre1} alt="Image scene en jpg" />
            <Image src={theatre2} alt="Image scene en jpg" />
            <Image src={theatre3} alt="Image scene en jpg" />
        </div>
    </>
}