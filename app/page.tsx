"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, Star, Instagram, Facebook, Phone, MapPin, Clock, Calendar } from 'lucide-react';
import ConfirmationAlert from './components/ConfirmationAlert';
import Image from "next/image"; // Importado, pero usaremos <img> para evitar configurar dominios externos ahora mismo
import Link from 'next/link';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  // Manejo del scroll para cambiar el estilo del navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Paleta de colores personalizada (Gold)
  const goldColor = "text-[#C5A059]";
  const goldBorder = "border-[#C5A059]";
  const goldBg = "bg-[#C5A059]";

  const services = [
    { name: "Corte Mujer/Hombre", price: "Desde 15€", time: "30-60 min" },
    { name: "Tinte y Color", price: "Desde 35€", time: "90 min" },
    { name: "Tratamiento Keratina", price: "Consultar", time: "150 min" },
    { name: "Mechas Balayage", price: "Desde 60€", time: "180 min" },
    { name: "Peinados", price: "Desde 20€", time: "45 min" },
    { name: "Hidratación", price: "15€", time: "20 min" },
  ];

  const homeStaff = [
    { id: 1, name: 'Elena M.', role: 'Directora', image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=1000&auto=format&fit=crop' },
    { id: 2, name: 'Carlos R.', role: 'Estilista', image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a97be?q=80&w=1000&auto=format&fit=crop' },
  ];

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-[#C5A059] selection:text-white">
      
      {/* --- NAVBAR --- */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-500 ease-in-out border-b ${
          isScrolled ? 'bg-black/95 border-neutral-800 py-4' : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <div className="relative group cursor-pointer">
            <h1 className="text-2xl font-serif font-bold tracking-[0.2em] uppercase text-white">
              Salon<span className={goldColor}>App</span>
            </h1>
            <div className={`absolute -bottom-2 left-0 w-0 h-[1px] ${goldBg} transition-all duration-300 group-hover:w-full`}></div>
          </div>

          {/* Desktop Menu */}
          <div className={`hidden md:flex space-x-12 text-xs font-bold tracking-[0.15em] uppercase ${isScrolled ? 'text-gray-300' : 'text-white'}`}>
            {['Experiencia', 'Servicios', 'Equipo', 'Contacto'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#C5A059] transition-colors duration-300">
                {item}
              </a>
            ))}
          </div>

          {/* CTA Button Desktop */}
          <a href="/reservas" className={`hidden md:block px-8 py-3 text-xs font-bold tracking-[0.2em] uppercase border transition-all duration-300 ${
            isScrolled 
              ? `border-white text-white hover:${goldBg} hover:border-[#C5A059] hover:text-black` 
              : `bg-white text-black border-white hover:bg-transparent hover:text-white`
          }`}>
            Pedir Cita
          </a>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-black border-t border-neutral-800 p-8 flex flex-col space-y-6 md:hidden text-center animate-fadeIn">
            {['Experiencia', 'Servicios', 'Equipo', 'Contacto'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-white text-sm tracking-[0.2em] uppercase hover:text-[#C5A059]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
             <a href="/reservas" onClick={() => setMobileMenuOpen(false)} className={`w-full py-4 text-xs font-bold tracking-[0.2em] uppercase border ${goldBorder} text-[#C5A059] hover:bg-[#C5A059] hover:text-black transition-colors`}>
              Pedir Cita
            </a>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=2070&auto=format&fit=crop" 
            alt="Salon Interior Neighborhood" 
            className="w-full h-full object-cover filter brightness-[0.4] grayscale-[30%]"
          />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <p className={`${goldColor} text-xs md:text-sm font-bold tracking-[0.4em] uppercase mb-6 animate-fadeInUp`}>
            Tu peluquería de confianza
          </p>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white font-medium mb-8 leading-tight animate-fadeInUp delay-100">
            Tu estilo, <br />
            <span className="italic font-light">cerca de ti</span>
          </h2>
          <div className="w-[1px] h-24 bg-white/30 mx-auto mb-8 animate-growHeight"></div>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center animate-fadeInUp delay-200">
            <a href="/reservas" className={`px-10 py-4 text-xs font-bold tracking-[0.2em] uppercase bg-[#C5A059] text-black hover:bg-white transition-colors duration-500`}>
              Pedir Cita
            </a>
            <button onClick={() => setAlertOpen(true)} className="px-10 py-4 text-xs font-bold tracking-[0.2em] uppercase border border-white text-white hover:bg-white hover:text-black transition-colors duration-500">
              Simular Reserva
            </button>
            <button className="px-10 py-4 text-xs font-bold tracking-[0.2em] uppercase border border-white text-white hover:bg-white hover:text-black transition-colors duration-500">
              Ver Precios
            </button>
          </div>
        </div>
      </section>

      <ConfirmationAlert open={alertOpen} onClose={() => setAlertOpen(false)} />

      {/* --- INTRO / PHILOSOPHY --- */}
      <section id="experiencia" className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className={`absolute -top-6 -left-6 w-full h-full border ${goldBorder} z-0`}></div>
              <img 
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1974&auto=format&fit=crop" 
                alt="Hair Styling Detail" 
                className="w-full h-[600px] object-cover relative z-10 grayscale"
              />
            </div>
            <div className="lg:pl-12">
              <h3 className="text-4xl font-serif mb-8 leading-snug">
                Más que una peluquería, <br/>
                <span className={`italic ${goldColor}`}>somos vecinos.</span>
              </h3>
              <p className="text-neutral-500 mb-6 leading-relaxed font-light">
                En SalonApp nos gusta el trato cercano. Creemos que ir a la peluquería 
                debe ser un momento para relajarte y salir viéndote bien, sin complicaciones.
                Aquí te escuchamos para dar con el corte que realmente quieres.
              </p>
              <p className="text-neutral-500 mb-10 leading-relaxed font-light">
                Llevamos años en el barrio cuidando de la imagen de nuestros clientes, 
                con la profesionalidad de siempre y un ambiente donde te sentirás como en casa.
              </p>
              
              <div className="flex items-center space-x-12">
                <div>
                  <span className="block text-3xl font-serif">15+</span>
                  <span className="text-xs uppercase tracking-widest text-neutral-400">Años contigo</span>
                </div>
                <div>
                  <span className="block text-3xl font-serif">2k+</span>
                  <span className="text-xs uppercase tracking-widest text-neutral-400">Vecinos Atendidos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES MENU (Black Section) --- */}
      <section id="servicios" className="py-24 bg-neutral-950 text-white relative">
        {/* Decorative elements */}
        <div className={`absolute top-0 right-0 w-1/3 h-[1px] ${goldBg}`}></div>
        <div className={`absolute bottom-0 left-0 w-1/3 h-[1px] ${goldBg}`}></div>

        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <span className={`${goldColor} text-xs font-bold tracking-[0.3em] uppercase block mb-4`}>Precios Claros</span>
            <h3 className="text-4xl md:text-5xl font-serif">Nuestros Servicios</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <div key={index} className="group cursor-default">
                <div className="flex justify-between items-end mb-3 relative overflow-hidden">
                  <span className="text-lg font-medium tracking-wide relative z-10 bg-neutral-950 pr-4 group-hover:text-[#C5A059] transition-colors duration-300">
                    {service.name}
                  </span>
                  {/* Dotted line filler */}
                  <div className="absolute bottom-1 w-full border-b border-neutral-800"></div>
                  <span className={`text-xl font-serif ${goldColor} relative z-10 bg-neutral-950 pl-4`}>
                    {service.price}
                  </span>
                </div>
                <p className="text-neutral-500 text-xs tracking-wider uppercase">{service.time}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-20">
            <button className={`px-12 py-4 text-xs font-bold tracking-[0.2em] uppercase border ${goldBorder} text-[#C5A059] hover:bg-[#C5A059] hover:text-black transition-all duration-300`}>
              Ver Carta Completa
            </button>
          </div>
        </div>
      </section>

      {/* --- FEATURED / CTA GRID --- */}
      <section className="grid grid-cols-1 md:grid-cols-2 h-auto md:h-[600px]">
        {/* Left: Image */}
        <div className="relative h-[400px] md:h-full group overflow-hidden">
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=1978&auto=format&fit=crop" 
            alt="Products" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        
        {/* Right: Content */}
        <div className="bg-[#F5F5F5] flex flex-col justify-center p-12 md:p-24">
          <Star className={`${goldColor} mb-6 w-8 h-8`} />
          <h3 className="text-3xl md:text-4xl font-serif mb-6 text-neutral-900">
            Productos de Calidad
          </h3>
          <p className="text-neutral-600 mb-10 leading-relaxed font-light">
            Usamos marcas reconocidas que cuidan tu pelo. Nos importa que tu cabello 
            esté sano y brillante, por eso seleccionamos lo mejor para ti, 
            sin que te cueste una fortuna.
          </p>
          <a href="#" className="inline-flex items-center text-xs font-bold tracking-[0.2em] uppercase border-b border-black pb-2 w-fit hover:text-[#C5A059] hover:border-[#C5A059] transition-colors">
            Marcas que usamos
          </a>
        </div>
      </section>

      {/* --- TEAM/OWNER PREVIEW --- */}
      <section id="equipo" className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <span className={`${goldColor} text-xs font-bold tracking-[0.3em] uppercase block mb-4`}>Conócenos</span>
          <h3 className="text-4xl font-serif mb-16">Nuestro Equipo</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-2 gap-8">
            {homeStaff.map((staff) => (
              <div key={staff.id} className="group">
                <div className="h-[240px] md:h-[450px] w-full mb-6 overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                    <span className="text-white text-xs tracking-[0.2em] uppercase border border-white px-6 py-3">Ver Perfil</span>
                  </div>
                  <img 
                    src={staff.image}
                    alt={staff.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <h4 className="text-lg font-serif">{staff.name}</h4>
                <p className={`text-xs uppercase tracking-widest ${goldColor} mt-2`}>{staff.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-neutral-950 text-white pt-20 pb-10 border-t border-neutral-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
            {/* Column 1: Brand */}
            <div>
              <h2 className="text-2xl font-serif font-bold tracking-[0.2em] uppercase mb-8">
                Salon<span className={goldColor}>App</span>
              </h2>
              <p className="text-neutral-500 text-sm leading-loose mb-8 max-w-xs">
                Tu peluquería de siempre, con un toque actual. Cuidamos de tu estilo 
                y de ti, cerca de casa.
              </p>
              <div className="flex space-x-6">
                <Instagram className="w-5 h-5 text-neutral-400 hover:text-[#C5A059] cursor-pointer transition-colors" />
                <Facebook className="w-5 h-5 text-neutral-400 hover:text-[#C5A059] cursor-pointer transition-colors" />
              </div>
            </div>

            {/* Column 2: Contact */}
            <div>
              <h4 className="text-sm font-bold tracking-[0.2em] uppercase mb-8 border-b border-neutral-800 pb-4 inline-block">
                Contacto
              </h4>
              <ul className="space-y-6 text-neutral-400 text-sm">
                <li className="flex items-start">
                  <MapPin className={`w-5 h-5 ${goldColor} mr-4 mt-0.5`} />
                  <span>Calle Velázquez, 45<br/>28001 Madrid, España</span>
                </li>
                <li className="flex items-center">
                  <Phone className={`w-5 h-5 ${goldColor} mr-4`} />
                  <span>+34 912 345 678</span>
                </li>
                <li className="flex items-center">
                  <Clock className={`w-5 h-5 ${goldColor} mr-4`} />
                  <span>Lun - Sab: 10:00 - 20:00</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Newsletter (Minimal) */}
            <div>
              <h4 className="text-sm font-bold tracking-[0.2em] uppercase mb-8 border-b border-neutral-800 pb-4 inline-block">
                Newsletter
              </h4>
              <p className="text-neutral-500 text-sm mb-6">
                Suscríbete para recibir novedades y ofertas exclusivas.
              </p>
              <div className="flex flex-col space-y-4">
                <input 
                  type="email" 
                  placeholder="TU EMAIL" 
                  className="bg-transparent border-b border-neutral-700 py-3 text-sm focus:outline-none focus:border-[#C5A059] text-white placeholder-neutral-600 transition-colors"
                />
                <button className={`text-left text-xs font-bold tracking-[0.2em] uppercase ${goldColor} hover:text-white transition-colors`}>
                  Suscribirse &rarr;
                </button>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-neutral-900 pt-8 flex flex-col md:flex-row justify-between items-center text-neutral-600 text-xs uppercase tracking-widest">
            <p>&copy; 2025 SalonApp Project. TFG Demo.</p>
            <div className="flex space-x-8 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacidad</a>
              <a href="#" className="hover:text-white transition-colors">Términos</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating CTA: aparece al hacer scroll */}
      {isScrolled && (
        <Link
          href="/reservas"
          className="fixed bottom-4 right-4 z-50 bg-[#C5A059] text-black px-4 py-2 rounded-full shadow-lg uppercase font-bold tracking-[0.12em] hover:scale-105 transition-transform duration-200 flex items-center gap-2 text-sm animate-fadeInUp duration-700"
          aria-label="Pedir cita"
        >
          <Calendar className="w-4 h-4" />
          <span>Pedir Cita</span>
        </Link>
      )}
    </div>
  );
};

// ConfirmationAlert instance
// Se monta desde el componente padre `Home` a través del estado `alertOpen`.