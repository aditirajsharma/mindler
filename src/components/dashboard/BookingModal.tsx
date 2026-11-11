import React, { useState } from 'react';
import { X, Calendar, Clock, ShieldCheck, UserCheck, CheckCircle2 } from 'lucide-react';
import { useWellness } from '../../context/WellnessContext';

interface BookingModalProps {
  onClose: () => void;
}

const DOCTORS = [
  {
    name: 'Dr. Elena Rostova, MD',
    role: 'Psychiatrist' as const,
    credentials: 'Board-Certified Neuropsychiatrist (Johns Hopkins)',
    specialty: 'Trauma recovery, autonomic nervous system, & e-Rx medication',
    rate: 140,
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
  },
  {
    name: 'Dr. Marcus Vance, Psy.D.',
    role: 'Psychologist' as const,
    credentials: 'Licensed Clinical Somatic Psychologist',
    specialty: 'Somatic experiencing, polyvagal therapy, & CBT',
    rate: 85,
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300',
  },
  {
    name: 'Dr. Priya Ananya, Ph.D.',
    role: 'Psychologist' as const,
    credentials: 'IAYT Yoga Therapist & Somatic Neurobiologist',
    specialty: 'Pranayama clinical biofeedback & stress decompression',
    rate: 85,
    avatar: 'https://images.unsplash.com/photo-1594824813583-066b0b5550a6?auto=format&fit=crop&q=80&w=300',
  },
];

const TIME_SLOTS = [
  '09:00 AM EST',
  '11:30 AM EST',
  '02:00 PM EST',
  '04:30 PM EST',
  '06:00 PM EST',
];

export const BookingModal: React.FC<BookingModalProps> = ({ onClose }) => {
  const { bookConsultation } = useWellness();
  const [selectedDoctorIndex, setSelectedDoctorIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState('2026-11-14');
  const [selectedTime, setSelectedTime] = useState(TIME_SLOTS[2]);
  const [hasStudentDiscount, setHasStudentDiscount] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const doctor = DOCTORS[selectedDoctorIndex];
  const finalPrice = hasStudentDiscount ? Math.round(doctor.rate * 0.7) : doctor.rate;

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    bookConsultation({
      doctorName: doctor.name,
      credentials: doctor.credentials,
      specialty: doctor.specialty,
      date: selectedDate,
      time: selectedTime,
      type: doctor.role,
      avatar: doctor.avatar,
    });
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl bg-[#0E0B1A] border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-text-muted hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-white">
              Consultation Confirmed!
            </h3>
            <p className="text-xs sm:text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
              Your appointment with <span className="text-purple-300 font-semibold">{doctor.name}</span> on <span className="text-white font-medium">{selectedDate}</span> at <span className="text-white font-medium">{selectedTime}</span> has been confirmed. A calendar invite and encrypted HIPAA join link have been added to your dashboard.
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm shadow-neon"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleBooking} className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-purple-400 font-bold">
                Clinical Telehealth Booking
              </span>
              <h2 className="font-serif text-2xl font-bold text-white">
                Schedule a Specialist
              </h2>
              <p className="text-xs text-text-muted">
                100% private, board-certified clinicians with zero retainer lock-ins.
              </p>
            </div>

            {/* Doctor Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-2">
                Select Provider
              </label>
              <div className="space-y-2">
                {DOCTORS.map((doc, idx) => (
                  <div
                    key={doc.name}
                    onClick={() => setSelectedDoctorIndex(idx)}
                    className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all ${
                      selectedDoctorIndex === idx
                        ? 'bg-purple-900/50 border-purple-400 shadow-card-glow'
                        : 'bg-white/5 border-white/10 hover:border-purple-500/30'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={doc.avatar}
                        alt={doc.name}
                        className="w-11 h-11 rounded-xl object-cover border border-purple-400/30"
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="text-sm font-bold text-white">{doc.name}</h4>
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-purple-950 text-purple-300 border border-purple-800/40">
                            {doc.role}
                          </span>
                        </div>
                        <p className="text-xs text-text-muted">{doc.specialty}</p>
                      </div>
                    </div>
                    <div className="text-right pl-2">
                      <span className="text-sm font-bold text-white">${doc.rate}</span>
                      <span className="text-[10px] text-text-muted block">/ 50 min</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-2">
                  Select Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-[#151124] border border-purple-500/25 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-purple-300 mb-2">
                  Available Slot
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full bg-[#151124] border border-purple-500/25 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-400"
                >
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot} className="bg-[#151124] text-white">
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Student Concession Toggle */}
            <div className="p-3 rounded-2xl bg-purple-950/30 border border-purple-600/30 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-purple-200 block">
                  30% Student Concession
                </span>
                <span className="text-[11px] text-text-muted">
                  Apply automatic discount with any verified .edu student credential.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setHasStudentDiscount(!hasStudentDiscount)}
                className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 ${
                  hasStudentDiscount ? 'bg-purple-600' : 'bg-white/10'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    hasStudentDiscount ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Pricing Summary */}
            <div className="flex items-center justify-between pt-2 border-t border-purple-900/30 text-xs">
              <div className="text-text-muted flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero-Knowledge Encrypted • HIPAA Verified</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-text-muted line-through mr-2">
                  {hasStudentDiscount ? `$${doctor.rate}` : ''}
                </span>
                <span className="text-lg font-bold text-white">
                  ${finalPrice}
                </span>
              </div>
            </div>

            {/* Submit */}
            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-white/10 text-text-secondary hover:text-white text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm shadow-neon hover:scale-102 transition-all"
              >
                Confirm Appointment (${finalPrice})
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

