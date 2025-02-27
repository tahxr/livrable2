import styles from "@/components/Descreption.module.css"

export default function Descreption({ children, titre }) {
    return <>
        <h2>
            {titre}
        </h2>

        <div className={styles.div}>
            {children}
        </div>
    </>

}