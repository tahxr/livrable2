"use client"
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation"; // 1. Import useRouter
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import styles from "@/app/reservation/reservation.module.css";

export default function ReservationPage() {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [reservationStatus, setReservationStatus] = useState(""); // Pour gérer l'état de la réservation (succès/erreur)
  
  const router = useRouter(); // 2. Get router

  const predefinedTimes = ["12:00", "12:30", "13:00", "19:00", "19:30", "20:00", "20:30", "21:00"];

  const onSubmit = async (data) => {
    console.log("Réservation confirmée :", data);
    
    // Récupérer le token JWT de votre stockage (par exemple, localStorage)
    const token = localStorage.getItem('token'); // Ajustez cela selon la manière dont vous stockez le token
  
    try {
      const dateString = selectedDate.toISOString().split('T')[0]; // e.g. "2025-03-21"
      const response = await fetch("http://localhost:5000/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Ajout du token dans l'en-tête
        },

        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          date: dateString,
          time: data.time,
          guests: data.guests,
        }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        setReservationStatus("Réservation réussie !");
        setTimeout(() => {
          router.push("/reservation/myreservation");
        }, 2000); // 2-second delay
      } else {
        setReservationStatus(result.message || "Erreur lors de la réservation.");
      }
    } catch (error) {
      console.error("Erreur lors de la réservation :", error);
      setReservationStatus("Erreur interne du serveur.");
    }
  };

  return (
    <div className={styles.reservationContainer}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Réservez une table</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.reservationForm}>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Nom</label>
            <input {...register("name", { required: "Nom requis" })} className={styles.inputField} />
            {errors.name && <p className={styles.errorMessage}>{errors.name.message}</p>}
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Email</label>
            <input type="email" {...register("email", { required: "Email requis" })} className={styles.inputField} />
            {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Téléphone</label>
            <input type="tel" {...register("phone", { required: "Téléphone requis" })} className={styles.inputField} />
            {errors.phone && <p className={styles.errorMessage}>{errors.phone.message}</p>}
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Date</label>
            <DatePicker 
              selected={selectedDate} 
              onChange={(date) => {
                setSelectedDate(date);
                setValue("date", format(date, "dd/MM/yyyy"));
              }}
              className={styles.inputField}
              dateFormat="dd/MM/yyyy"
            />
            {errors.date && <p className={styles.errorMessage}>{errors.date.message}</p>}
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Heure</label>
            <select
              {...register("time", { required: "Heure requise" })}
              className={styles.inputField}
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            >
              <option value="">Sélectionnez une heure</option>
              {predefinedTimes.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
            {errors.time && <p className={styles.errorMessage}>{errors.time.message}</p>}
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Nombre de personnes</label>
            <input type="number" min="1" {...register("guests", { required: "Nombre requis" })} className={styles.inputField} />
            {errors.guests && <p className={styles.errorMessage}>{errors.guests.message}</p>}
          </div>
          <button type="submit" className={styles.submitButton}>
            Réserver
          </button>
        </form>

        {reservationStatus && <p className={styles.statusMessage}>{reservationStatus}</p>}
      </div>

      {/* Google Maps iframe */}
      <div className={styles.mapContainer}>
        <h3>Localisation</h3>
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2799.5060085082405!2d-75.62680759999999!3d45.4394585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cce0ff104b131ed%3A0x5045d05b7789c105!2sLa%20Cit%C3%A9%2C%20le%20coll%C3%A8ge%20d&#39;arts%20appliqu%C3%A9s%20et%20de%20technologie!5e0!3m2!1sfr!2sca!4v1741365254810!5m2!1sfr!2sca" 
          width="600" 
          height="450" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
