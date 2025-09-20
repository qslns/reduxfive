import { Exhibition } from '../types';

export const exhibitions: Exhibition[] = [
  {
    id: 'cine-mode',
    title: 'CINE MODE',
    titleKo: '시네 모드',
    description: '패션과 영화의 경계를 허무는 실험. 5명의 디자이너가 영상과 설치를 통해 각자의 비전을 제시한다.',
    venue: 'Seoul Art Center',
    startDate: '2025-03-01',
    endDate: '2025-03-31',
    year: 2025,
    participants: ['kim-bomin', 'park-parang', 'lee-taehyeon', 'choi-eunsol', 'kim-gyeongsu'],
    images: [
      '/images/exhibitions/cinemode/1.jpg',
      '/images/exhibitions/cinemode/2.jpg',
      '/images/exhibitions/cinemode/3.jpg',
      '/images/exhibitions/cinemode/4.jpg'
    ],
    status: 'upcoming',
    featured: true
  },
  {
    id: 'the-room',
    title: 'THE ROOM OF [ ]',
    titleKo: '더 룸 오브 [ ]',
    description: '빈 공간이 가능성이 되는 공간. 패션 디자인에서 무한한 가능성을 탐구하는 몰입형 설치 전시.',
    venue: 'DDP (Dongdaemun Design Plaza)',
    startDate: '2025-12-01',
    endDate: '2025-12-31',
    year: 2025,
    participants: ['kim-bomin', 'park-parang', 'lee-taehyeon', 'choi-eunsol', 'kim-gyeongsu'],
    images: [
      '/images/exhibitions/theroom/qslna_dawn_alleyway_low-angle_28_mm_R13_2025_layered_denim-ov_828e4c6e-0b81-4949-8c96-7e241f9a3c03_0.png',
      '/images/exhibitions/theroom/qslna_minimalist_concrete_courtyard_high-key_daylight_overcas_85d5cd51-4cd3-40e8-9111-12e1bf3c2bdd_0.png',
      '/images/exhibitions/theroom/qslna_mirror-box_installation_four_polished_steel_walls_refle_4ffced5d-0e8e-41c6-a7ad-8f08583b1c72_2.png',
      '/images/exhibitions/theroom/qslna_split-frame_triptych_left_strip--front_close-crop_of_ma_25f1d65c-d800-4e74-9a72-5919d703eeb2_1.png'
    ],
    status: 'upcoming',
    featured: true
  }
];