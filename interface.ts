export interface HoroscopeResponse {
  Burc: string;
  Mottosu: string;
  Gezegeni: string;
  Elementi: string;
  GunlukYorum: string | null | undefined;
  Yorum: string | null | undefined;
};

export interface Horoscopes {
  name: string;
  value: string;
  image: string;
  date: string;
}