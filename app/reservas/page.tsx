"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, ArrowLeft, ChevronRight, User, Calendar, Clock } from 'lucide-react';
import ConfirmationAlert from '../components/ConfirmationAlert';

// Usamos `useRouter` del App Router de Next.js para navegación real

// --- INTERFACES & TYPES ---
interface Service {
  id: number;
  name: string;
  price: number;
  duration: number;
}

interface Staff {
  id: number;
  name: string;
  role: string;
  image: string;
}

// El profesional puede ser uno específico o "Cualquiera"
type SelectedStaff = Staff | { name: string; id?: number; role?: string; image?: string };

interface BookingSelection {
  service: Service | null;
  staff: SelectedStaff | null;
  date: Date | null;
  time: string | null;
}

// --- DATOS MOCK (Simulados del Backend) ---
const SERVICES_DATA: Service[] = [
  { id: 1, name: "Corte Estilo", price: 25, duration: 45 },
  { id: 2, name: "Corte + Barba", price: 35, duration: 60 },
  { id: 3, name: "Tinte Completo", price: 50, duration: 90 },
  { id: 4, name: "Mechas Balayage", price: 75, duration: 150 },
  { id: 5, name: "Tratamiento Keratina", price: 100, duration: 120 },
  { id: 6, name: "Peinado Evento", price: 40, duration: 60 },
];

const STAFF_DATA: Staff[] = [
  { id: 1, name: "Elena M.", role: "Directora", image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=1000&auto=format&fit=crop" },
  { id: 2, name: "Carlos R.", role: "Estilista", image: "https://images.unsplash.com/photo-1580618672591-eb180b1a97be?q=80&w=1000&auto=format&fit=crop" },
];

const TIME_SLOTS: string[] = ["10:00", "11:00", "12:30", "16:00", "17:30", "19:00"];

export default function BookingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selection, setSelection] = useState<BookingSelection>({
    service: null,
    staff: null,
    date: null,
    time: null
  });
  const [alertOpen, setAlertOpen] = useState(false);

  // Estilos constantes
  const goldColor = "text-[#C5A059]";
  const goldBorder = "border-[#C5A059]";
  const goldBg = "bg-[#C5A059]";

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  // Función auxiliar para obtener los próximos días (Demo)
  const getNextDays = (): Date[] => {
    const days: Date[] = [];
    const today = new Date();
    for (let i = 0; i < 3; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      days.push(d);
    }
    return days;
  };

  const handleConfirm = () => {
    // Aquí iría la lógica para enviar la reserva al backend Spring Boot
    // Mostrar la ventana de confirmación estilizada en lugar del alert nativo
    setAlertOpen(true);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
    router.push('/');
  };

  const confirmationDetails = selection.service
    ? `${selection.service.name}${selection.date ? ' · ' + selection.date.toLocaleDateString('es-ES') : ''}${selection.time ? ' · ' + selection.time : ''}`
    : undefined;

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-[#C5A059] selection:text-white flex flex-col">
      
      {/* --- HEADER SIMPLE --- */}
      <header className="border-b border-neutral-100 py-6 sticky top-0 bg-white z-40">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <button 
            onClick={() => router.push('/')} 
            className="flex items-center text-xs font-bold tracking-[0.2em] uppercase hover:text-[#C5A059] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Volver
          </button>
          <div className="text-center">
            <h2 className="text-xl font-serif font-bold tracking-[0.1em] uppercase">
              Reserva<span className={goldColor}>Online</span>
            </h2>
          </div>
          <div className="w-20"></div> {/* Espaciador para centrar el título */}
        </div>
      </header>

      {/* --- BARRA DE PROGRESO --- */}
      <div className="w-full bg-neutral-100 h-1">
        <div 
          className={`h-full ${goldBg} transition-all duration-500 ease-out`} 
          style={{ width: `${(step / 4) * 100}%` }}
        ></div>
      </div>

      <main className="flex-grow container mx-auto px-6 py-12 max-w-4xl">
        
        {/* Título del Paso */}
        <div className="mb-12 text-center animate-fadeInUp">
          <span className={`text-xs font-bold tracking-[0.3em] uppercase ${goldColor} block mb-3`}>
            Paso {step} de 4
          </span>
          <h3 className="text-3xl md:text-4xl font-serif text-neutral-900">
            {step === 1 && "Elige tu Servicio"}
            {step === 2 && "Selecciona Profesional"}
            {step === 3 && "Fecha y Hora"}
            {step === 4 && "Confirma tu Cita"}
          </h3>
        </div>

        <div className="animate-fadeIn">
          
          {/* PASO 1: SERVICIOS */}
          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SERVICES_DATA.map((service) => (
                <div 
                  key={service.id}
                  onClick={() => setSelection({ ...selection, service })}
                  className={`p-6 border cursor-pointer transition-all duration-300 flex justify-between items-center group
                    ${selection.service?.id === service.id 
                      ? `border-black bg-black text-white` 
                      : `border-neutral-200 hover:border-[#C5A059]`}`}
                >
                  <div>
                    <h4 className={`text-lg font-serif mb-1 ${selection.service?.id === service.id ? 'text-white' : 'text-neutral-900'}`}>
                      {service.name}
                    </h4>
                    <span className={`text-xs uppercase tracking-widest ${selection.service?.id === service.id ? 'text-neutral-400' : 'text-neutral-500'}`}>
                      {service.duration} min
                    </span>
                  </div>
                  <span className={`text-xl font-serif ${selection.service?.id === service.id ? goldColor : 'text-neutral-900'}`}>
                    {service.price}€
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* PASO 2: STAFF */}
          {step === 2 && (
              <div className="grid grid-cols-2 md:grid-cols-2 gap-6">

              {/* Lista de Profesionales */}
              {STAFF_DATA.map((staff) => (
                <div 
                  key={staff.id}
                  onClick={() => setSelection({ ...selection, staff })}
                  className={`border p-0 cursor-pointer transition-all duration-300 group relative overflow-hidden
                    ${selection.staff?.id === staff.id ? 'border-black' : 'border-neutral-200 hover:border-[#C5A059]'}`}
                >
                  <div className="h-36 md:h-64 w-full overflow-hidden">
                    <img src={staff.image} alt={staff.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  </div>
                  <div className={`p-3 md:p-8 text-center ${selection.staff?.id === staff.id ? 'bg-black text-white' : 'bg-white'}`}>
                    <h4 className="text-lg font-serif mb-1">{staff.name}</h4>
                    <p className={`text-xs uppercase tracking-widest ${selection.staff?.id === staff.id ? goldColor : 'text-neutral-500'}`}>{staff.role}</p>
                  </div>
                  {selection.staff?.id === staff.id && (
                    <div className={`absolute top-3 right-3 bg-white text-black p-1`}>
                      <Check size={16} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* PASO 3: FECHA Y HORA */}
          {step === 3 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Fechas */}
              <div>
                <h4 className="text-sm font-bold tracking-[0.2em] uppercase mb-6 border-b pb-2">Selecciona Día</h4>
                <div className="space-y-3">
                  {getNextDays().map((date, idx) => (
                    <div 
                      key={idx}
                      onClick={() => setSelection({ ...selection, date: date })}
                      className={`p-4 border flex items-center justify-between cursor-pointer transition-all
                        ${selection.date?.getDate() === date.getDate() 
                          ? 'bg-black text-white border-black' 
                          : 'border-neutral-200 hover:border-[#C5A059]'}`}
                    >
                      <span className="text-lg font-serif">
                        {date.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
                      </span>
                      {selection.date?.getDate() === date.getDate() && <Check size={18} className={goldColor} />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Horas */}
              <div className={`${!selection.date ? 'opacity-30 pointer-events-none' : 'opacity-100'} transition-opacity`}>
                <h4 className="text-sm font-bold tracking-[0.2em] uppercase mb-6 border-b pb-2">Selecciona Hora</h4>
                <div className="grid grid-cols-2 gap-3">
                  {TIME_SLOTS.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelection({ ...selection, time })}
                      className={`py-3 px-4 text-sm font-bold tracking-wider border transition-all
                        ${selection.time === time 
                          ? 'bg-[#C5A059] text-black border-[#C5A059]' 
                          : 'border-neutral-200 hover:border-black'}`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PASO 4: RESUMEN */}
          {step === 4 && (
            <div className="bg-[#F9F9F9] p-8 md:p-12 border border-neutral-200 max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <Check className={`w-12 h-12 mx-auto mb-4 ${goldColor}`} />
                <h4 className="text-2xl font-serif">Resumen de tu Cita</h4>
              </div>
              
              <div className="space-y-6 text-sm md:text-base">
                <div className="flex justify-between border-b border-neutral-300 pb-4">
                  <span className="text-neutral-500 uppercase tracking-widest text-xs font-bold">Servicio</span>
                  <span className="font-serif text-lg">{selection.service?.name}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-300 pb-4">
                  <span className="text-neutral-500 uppercase tracking-widest text-xs font-bold">Profesional</span>
                  <span className="font-serif text-lg">{selection.staff?.name}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-300 pb-4">
                  <span className="text-neutral-500 uppercase tracking-widest text-xs font-bold">Fecha</span>
                  <span className="font-serif text-lg">
                    {selection.date?.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric' })} - {selection.time}
                  </span>
                </div>
                <div className="flex justify-between pt-4">
                  <span className="text-neutral-500 uppercase tracking-widest text-xs font-bold self-center">Total Estimado</span>
                  <span className={`font-serif text-3xl ${goldColor}`}>{selection.service?.price}€</span>
                </div>
              </div>

              <div className="mt-12 space-y-4">
                <button 
                  onClick={handleConfirm}
                  className="w-full py-4 text-xs font-bold tracking-[0.2em] uppercase bg-black text-white hover:bg-[#C5A059] hover:text-black transition-colors duration-300"
                >
                  Confirmar Reserva
                </button>
                <p className="text-center text-xs text-neutral-400">
                  Al confirmar, aceptas nuestra política de cancelación de 24h.
                </p>
              </div>
            </div>
          )}

          {/* --- BOTONES DE NAVEGACIÓN --- */}
          <div className="mt-12 flex justify-between pt-8 border-t border-neutral-100">
            {step > 1 && (
              <button onClick={prevStep} className="text-neutral-500 hover:text-black text-xs font-bold tracking-[0.2em] uppercase">
                Atrás
              </button>
            )}
            
            <div className="ml-auto">
              {step < 4 && (
                <button 
                  onClick={nextStep}
                  disabled={
                    (step === 1 && !selection.service) ||
                    (step === 2 && !selection.staff) ||
                    (step === 3 && (!selection.date || !selection.time))
                  }
                  className={`flex items-center px-8 py-3 text-xs font-bold tracking-[0.2em] uppercase transition-all
                    ${((step === 1 && !selection.service) || (step === 2 && !selection.staff) || (step === 3 && (!selection.date || !selection.time)))
                      ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                      : 'bg-black text-white hover:bg-[#C5A059] hover:text-black'
                    }`}
                >
                  Siguiente <ChevronRight className="w-4 h-4 ml-2" />
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
      <ConfirmationAlert open={alertOpen} onClose={handleCloseAlert} message="Reserva agendada correctamente" details={confirmationDetails} />
    </div>
  );
}