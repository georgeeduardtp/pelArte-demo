"use client";

import React from "react";
import { Check } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  message?: string;
  details?: string;
};

export default function ConfirmationAlert({ open, onClose, message = "Reserva agendada correctamente", details }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="p-8 text-center">
          <div className="mx-auto w-20 h-20 rounded-full bg-[#C5A059] flex items-center justify-center mb-6">
            <Check className="w-10 h-10 text-black" />
          </div>
          <h3 className="text-2xl font-serif font-medium mb-2 text-neutral-900">{message}</h3>
          {details && <p className="text-sm text-neutral-600 mb-6">{details}</p>}
          <p className="text-sm text-neutral-600 mb-6">Te hemos enviado la confirmación. Gracias por confiar en nosotros.</p>
          <div className="flex justify-center">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded uppercase font-bold tracking-[0.12em] text-xs border border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059] hover:text-black transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
