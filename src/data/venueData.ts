export interface Venue {
  id: string;
  name: string;
  nameAr: string;
  type: 'outdoor' | 'indoor';
  category: 'plaza' | 'auditorium' | 'conference';
  typeLabel: string;
  typeLabelAr: string;
  capacity: number;
  description: string;
  descriptionAr: string;
  eventTags: string[];
  eventTagsAr: string[];
  image?: string;
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
    category: 'plaza',
    typeLabel: 'Outdoor Iconic Plaza',
    typeLabelAr: 'ساحة خارجية مميزة',
    capacity: 5000,
    description: 'The iconic centerpiece of Expo City Dubai, featuring a stunning trellis dome perfect for large-scale events and spectacular projection shows.',
    descriptionAr: 'النقطة المحورية المميزة في إكسبو سيتي دبي، تتميز بقبة شبكية مذهلة مثالية للفعاليات الكبيرة وعروض الإسقاط المذهلة.',
    eventTags: ['Concert', 'Festival', 'Corporate Event', 'Gala'],
    eventTagsAr: ['حفلة موسيقية', 'مهرجان', 'فعالية مؤسسية', 'حفل']
  },
  {
    id: 'terra-auditorium',
    name: 'Terra Auditorium',
    nameAr: 'قاعة تيرا',
    type: 'indoor',
    category: 'auditorium',
    typeLabel: 'Indoor Theatre',
    typeLabelAr: 'مسرح داخلي',
    capacity: 800,
    description: 'A state-of-the-art auditorium with world-class acoustics and audiovisual capabilities, ideal for conferences, presentations, and performances.',
    descriptionAr: 'قاعة حديثة مجهزة بأحدث التقنيات الصوتية والمرئية، مثالية للمؤتمرات والعروض التقديمية والحفلات.',
    eventTags: ['Conference', 'Presentation', 'Performance', 'Award Ceremony'],
    eventTagsAr: ['مؤتمر', 'عرض تقديمي', 'عرض فني', 'حفل توزيع جوائز']
  },
  {
    id: 'jubilee-park',
    name: 'Jubilee Park',
    nameAr: 'حديقة اليوبيل',
    type: 'outdoor',
    category: 'plaza',
    typeLabel: 'Outdoor Plaza',
    typeLabelAr: 'ساحة خارجية',
    capacity: 2000,
    description: 'A beautiful outdoor park space perfect for exhibitions, product launches, festivals, and outdoor gatherings.',
    descriptionAr: 'مساحة حديقة خارجية جميلة مثالية للمعارض وإطلاق المنتجات والمهرجانات والتجمعات الخارجية.',
    eventTags: ['Exhibition', 'Product Launch', 'Festival', 'Outdoor Gathering'],
    eventTagsAr: ['معرض', 'إطلاق منتج', 'مهرجان', 'تجمع خارجي']
  },
  {
    id: 'conference-centre-a',
    name: 'Conference Centre – Hall A',
    nameAr: 'مركز المؤتمرات - القاعة أ',
    type: 'indoor',
    category: 'conference',
    typeLabel: 'Indoor Conference Hall',
    typeLabelAr: 'قاعة مؤتمرات داخلية',
    capacity: 400,
    description: 'A versatile conference hall equipped with modern amenities, suitable for corporate meetings, seminars, and workshops.',
    descriptionAr: 'قاعة مؤتمرات متعددة الاستخدامات مجهزة بأحدث المرافق، مناسبة للاجتماعات المؤسسية والندوات وورش العمل.',
    eventTags: ['Conference', 'Seminar', 'Workshop', 'Corporate Meeting'],
    eventTagsAr: ['مؤتمر', 'ندوة', 'ورشة عمل', 'اجتماع مؤسسي']
  },
  {
    id: 'sustainability-pavilion',
    name: 'Sustainability Pavilion',
    nameAr: 'جناح الاستدامة',
    type: 'indoor',
    category: 'auditorium',
    typeLabel: 'Indoor Exhibition Space',
    typeLabelAr: 'مساحة معرض داخلية',
    capacity: 600,
    description: 'An award-winning sustainable building featuring innovative exhibition spaces, perfect for eco-focused events and corporate showcases.',
    descriptionAr: 'مبنى مستدام حائز على جوائز يضم مساحات عرض مبتكرة، مثالي للفعاليات البيئية والعروض المؤسسية.',
    eventTags: ['Exhibition', 'Corporate Event', 'Product Launch', 'Sustainability Forum'],
    eventTagsAr: ['معرض', 'فعالية مؤسسية', 'إطلاق منتج', 'منتدى الاستدامة']
  },
  {
    id: 'garden-in-the-sky',
    name: 'Garden in the Sky',
    nameAr: 'الحديقة في السماء',
    type: 'outdoor',
    category: 'plaza',
    typeLabel: 'Rooftop Venue',
    typeLabelAr: 'مكان على السطح',
    capacity: 300,
    description: 'A stunning rooftop garden offering panoramic views, ideal for intimate gatherings, receptions, and exclusive events.',
    descriptionAr: 'حديقة سطحية مذهلة توفر إطلالات بانورامية، مثالية للتجمعات الحميمة والحفلات والفعاليات الحصرية.',
    eventTags: ['Reception', 'Private Event', 'Gala', 'Networking'],
    eventTagsAr: ['حفل استقبال', 'فعالية خاصة', 'حفل', 'تواصل']
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
    venueId: 'jubilee-park',
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
