import calendarSvg from '../../../../assets/Outline/UI Standard/calendar.svg';
import medicalPersonnelSvg from '../../../../assets/Outline/People/medical personnel.svg';
import userSvg from '../../../../assets/Outline/UI Standard/user.svg';
import hospitalBuildingSvg from '../../../../assets/Outline/Locations/hospital building 1.svg';
import medicalBagSvg from '../../../../assets/Outline/Instruments/medical bag.svg';
import hospitalSignSvg from '../../../../assets/Outline/Locations/hospital sign.svg';
import badgeCheckSvg from '../../../../assets/Outline/UI Standard/badge check.svg';
import checkClipboardSvg from '../../../../assets/Outline/UI Standard/check clipboard.svg';
import paperclipSvg from '../../../../assets/Outline/UI Standard/paperclip.svg';
import artificialIntelligenceSvg from '../../../../assets/Outline/UI Standard/artificial intelligence.svg';
import conversationSvg from '../../../../assets/Outline/Communication/conversation 1.svg';
import doctorSvg from '../../../../assets/Outline/People/doctor.svg';
import surgerySvg from '../../../../assets/Outline/Specialties/surgery.svg';
import cardiologySvg from '../../../../assets/Outline/Specialties/cardiology.svg';
import pediatricsSvg from '../../../../assets/Outline/Specialties/pediatrics.svg';
import internalMedicineSvg from '../../../../assets/Outline/Specialties/internal medicine.svg';
import orthopedicsSvg from '../../../../assets/Outline/Specialties/orthopedics.svg';
import obstetricsSvg from '../../../../assets/Outline/Specialties/obstetrics.svg';
import homeSvg from '../../../../assets/Outline/UI Standard/home.svg';
import bellSvg from '../../../../assets/Outline/UI Standard/bell.svg';
import dollarSvg from '../../../../assets/Outline/Commerce/dollar.svg';
import medicalFileSvg from '../../../../assets/Outline/Equipment/medical file.svg';
import medicalClipboardSvg from '../../../../assets/Outline/Equipment/medical clipboard.svg';
import userConnectionSvg from '../../../../assets/Outline/UI Standard/user connection.svg';
import userSignalSvg from '../../../../assets/Outline/UI Standard/user signal.svg';

export const icons = {
  calendar: calendarSvg,
  'medical personnel': medicalPersonnelSvg,
  user: userSvg,
  'hospital building': hospitalBuildingSvg,
  'medical bag': medicalBagSvg,
  'hospital sign': hospitalSignSvg,
  'badge check': badgeCheckSvg,
  'check clipboard': checkClipboardSvg,
  paperclip: paperclipSvg,
  'artificial intelligence': artificialIntelligenceSvg,
  conversation: conversationSvg,
  doctor: doctorSvg,
  surgery: surgerySvg,
  cardiology: cardiologySvg,
  pediatrics: pediatricsSvg,
  'internal medicine': internalMedicineSvg,
  orthopedics: orthopedicsSvg,
  obstetrics: obstetricsSvg,
  home: homeSvg,
  bell: bellSvg,
  dollar: dollarSvg,
  'medical file': medicalFileSvg,
  'medical clipboard': medicalClipboardSvg,
  'user connection': userConnectionSvg,
  'user signal': userSignalSvg,
};

const specialtyKeys: Record<string, string> = {
  surgery: 'surgery',
  cardiology: 'cardiology',
  pediatrics: 'pediatrics',
  'internal-medicine': 'internal medicine',
  orthopedics: 'orthopedics',
  obstetrics: 'obstetrics',
};

export function getSectionIconKey(iconPath: string | null): string {
  if (!iconPath) return 'doctor';
  const fileName = iconPath.split('/').pop()?.replace(/\.svg$/, '') ?? '';
  return specialtyKeys[fileName] ?? 'doctor';
}
