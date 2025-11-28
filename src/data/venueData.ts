export interface Venue {
  id: string;
  name: string;
  nameAr: string;
  type: 'outdoor' | 'indoor';
  typeLabel: string;
  typeLabelAr: string;
  capacity: number;
  description: string;
  descriptionAr: string;
}

export interface Booking {
  id: string;
  eventName: string;
  eventNameAr: string;
  venueId: string;
  date: string;
  status: 'Under Review' | 'Approved' | 'Rejected' | 'Pending Payment';
  statusAr: string;
}

export interface User {
  name: string;
  organization: string;
  email: string;
}

export const venues: Venue[] = [
  {
    id: 'al-wasl-plaza',
    name: 'Al Wasl Plaza',
    nameAr: 'ساحة الوصل',
    type: 'outdoor',
    typeLabel: 'Outdoor Iconic Plaza',
    typeLabelAr: 'ساحة خارجية مميزة',
    capacity: 5000,
    description: 'The iconic centerpiece of Expo City Dubai, featuring a stunning trellis dome perfect for large-scale events and spectacular projection shows.',
    descriptionAr: 'النقطة المحورية المميزة في إكسبو سيتي دبي، تتميز بقبة شبكية مذهلة مثالية للفعاليات الكبيرة وعروض الإسقاط المذهلة.'
  },
  {
    id: 'terra-auditorium',
    name: 'Terra Auditorium',
    nameAr: 'قاعة تيرا',
    type: 'indoor',
    typeLabel: 'Indoor Theatre',
    typeLabelAr: 'مسرح داخلي',
    capacity: 800,
    description: 'A state-of-the-art auditorium with world-class acoustics and audiovisual capabilities, ideal for conferences, presentations, and performances.',
    descriptionAr: 'قاعة حديثة مجهزة بأحدث التقنيات الصوتية والمرئية، مثالية للمؤتمرات والعروض التقديمية والحفلات.'
  },
  {
    id: 'mobility-district',
    name: 'Mobility District Plaza',
    nameAr: 'ساحة منطقة التنقل',
    type: 'outdoor',
    typeLabel: 'Outdoor Plaza',
    typeLabelAr: 'ساحة خارجية',
    capacity: 2000,
    description: 'An expansive outdoor space showcasing the future of mobility, perfect for exhibitions, product launches, and outdoor gatherings.',
    descriptionAr: 'مساحة خارجية واسعة تعرض مستقبل التنقل، مثالية للمعارض وإطلاق المنتجات والتجمعات الخارجية.'
  },
  {
    id: 'conference-centre-a',
    name: 'Conference Centre – Hall A',
    nameAr: 'مركز المؤتمرات - القاعة أ',
    type: 'indoor',
    typeLabel: 'Indoor Conference Hall',
    typeLabelAr: 'قاعة مؤتمرات داخلية',
    capacity: 400,
    description: 'A versatile conference hall equipped with modern amenities, suitable for corporate meetings, seminars, and workshops.',
    descriptionAr: 'قاعة مؤتمرات متعددة الاستخدامات مجهزة بأحدث المرافق، مناسبة للاجتماعات المؤسسية والندوات وورش العمل.'
  }
];

export const sampleBookings: Booking[] = [
  {
    id: 'EVD-2025-001',
    eventName: 'Sustainability Summit',
    eventNameAr: 'قمة الاستدامة',
    venueId: 'terra-auditorium',
    date: '2025-02-15',
    status: 'Under Review',
    statusAr: 'قيد المراجعة'
  },
  {
    id: 'EVD-2025-002',
    eventName: 'Global Mobility Forum',
    eventNameAr: 'منتدى التنقل العالمي',
    venueId: 'mobility-district',
    date: '2025-03-22',
    status: 'Approved',
    statusAr: 'موافق عليه'
  }
];

export const sampleUser: User = {
  name: 'Sara Al Mansoori',
  organization: 'Future Vision Events',
  email: 'sara.mansoori@futurevision.ae'
};

export const getVenueById = (id: string): Venue | undefined => {
  return venues.find(v => v.id === id);
};
