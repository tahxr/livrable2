"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import styles from "@/app/reservation/reservation.module.css";

export default function ReservationPage() {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");

  const predefinedTimes = ["12:00", "12:30", "13:00", "19:00", "19:30", "20:00", "20:30", "21:00"];

  const onSubmit = (data) => {
    console.log("Réservation confirmée :", data);
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
                setValue("date", format(date, "yyyy-MM-dd"));
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
      </div>
    </div>
  );
}
