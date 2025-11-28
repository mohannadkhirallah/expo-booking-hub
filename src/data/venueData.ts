import alWaslPlaza from '@/assets/venues/al-wasl-plaza.jpg';
import terraAuditorium from '@/assets/venues/terra-auditorium.webp';
import jubileePark from '@/assets/venues/jubilee-park.png';
import conferenceCentreA from '@/assets/venues/conference-centre-a.png';
import alif from '@/assets/venues/alif.png';
import surreal from '@/assets/venues/surreal.png';

// Facility types
export type FacilityType = 'amphitheatre' | 'terrace' | 'function-room' | 'theatre' | 'rooftop' | 'outdoor-space' | 'conference-hall' | 'park' | 'garden';

export interface Capacity {
  standing?: number;
  seated?: number;
  banquet?: number;
  cocktail?: number;
}

export interface Facility {
  id: string;
  name: string;
  nameAr: string;
  type: FacilityType;
  typeLabel: string;
  typeLabelAr: string;
  isIndoor: boolean;
  capacity: Capacity;
  description?: string;
  descriptionAr?: string;
}

export interface VenueSite {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  image?: string;
  facilities: Facility[];
  eventTags: string[];
  eventTagsAr: string[];
}

export interface Booking {
  id: string;
  eventName: string;
  eventNameAr: string;
  venueSiteId: string;
  facilityId: string;
  date: string;
  status: 'Draft' | 'Submitted' | 'Under Review' | 'Approved' | 'Rejected' | 'Pending Payment' | 'Completed';
  statusAr: string;
}

export interface User {
  name: string;
  organization: string;
  email: string;
}

// Legacy interface for backward compatibility during transition
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

// New Venue Sites with Facilities
export const venueSites: VenueSite[] = [
  {
    id: 'al-wasl-plaza',
    name: 'Al Wasl Plaza',
    nameAr: 'ساحة الوصل',
    description: 'The iconic centerpiece of Expo City Dubai, featuring a stunning trellis dome perfect for large-scale events and spectacular projection shows.',
    descriptionAr: 'النقطة المحورية المميزة في إكسبو سيتي دبي، تتميز بقبة شبكية مذهلة مثالية للفعاليات الكبيرة وعروض الإسقاط المذهلة.',
    image: alWaslPlaza,
    eventTags: ['Concert', 'Festival', 'Corporate Event', 'Gala', 'Award Ceremony'],
    eventTagsAr: ['حفلة موسيقية', 'مهرجان', 'فعالية مؤسسية', 'حفل', 'حفل توزيع جوائز'],
    facilities: [
      {
        id: 'al-wasl-main-dome',
        name: 'Al Wasl Plaza – Main Dome',
        nameAr: 'ساحة الوصل – القبة الرئيسية',
        type: 'amphitheatre',
        typeLabel: 'Amphitheatre / Central Dome',
        typeLabelAr: 'مدرج / قبة مركزية',
        isIndoor: false,
        capacity: { standing: 3000, seated: 820, banquet: 750, cocktail: 1000 },
        description: 'The main dome area with 360-degree projection capabilities.',
        descriptionAr: 'منطقة القبة الرئيسية مع إمكانيات العرض بزاوية 360 درجة.'
      },
      {
        id: 'pearl-terrace',
        name: 'Pearl Terrace',
        nameAr: 'شرفة اللؤلؤ',
        type: 'terrace',
        typeLabel: 'Terrace',
        typeLabelAr: 'شرفة',
        isIndoor: false,
        capacity: { seated: 65 },
        description: 'An elegant terrace overlooking Al Wasl Plaza.',
        descriptionAr: 'شرفة أنيقة تطل على ساحة الوصل.'
      },
      {
        id: 'al-wasl-spaces',
        name: 'Al Wasl Spaces',
        nameAr: 'مساحات الوصل',
        type: 'function-room',
        typeLabel: 'Indoor Function Rooms',
        typeLabelAr: 'غرف مناسبات داخلية',
        isIndoor: true,
        capacity: { standing: 200, seated: 80 },
        description: 'Flexible indoor function rooms for meetings and events.',
        descriptionAr: 'غرف مناسبات داخلية مرنة للاجتماعات والفعاليات.'
      }
    ]
  },
  {
    id: 'terra',
    name: 'Terra – Sustainability District',
    nameAr: 'تيرا – منطقة الاستدامة',
    description: 'A state-of-the-art sustainability pavilion offering world-class facilities for conferences, presentations, and eco-conscious events.',
    descriptionAr: 'جناح استدامة متطور يقدم مرافق عالمية المستوى للمؤتمرات والعروض التقديمية والفعاليات الصديقة للبيئة.',
    image: terraAuditorium,
    eventTags: ['Conference', 'Presentation', 'Performance', 'Award Ceremony', 'Summit'],
    eventTagsAr: ['مؤتمر', 'عرض تقديمي', 'عرض فني', 'حفل توزيع جوائز', 'قمة'],
    facilities: [
      {
        id: 'terra-auditorium',
        name: 'Terra Auditorium',
        nameAr: 'قاعة تيرا',
        type: 'theatre',
        typeLabel: 'Indoor Theatre',
        typeLabelAr: 'مسرح داخلي',
        isIndoor: true,
        capacity: { seated: 800 },
        description: 'A state-of-the-art auditorium with world-class acoustics.',
        descriptionAr: 'قاعة حديثة مجهزة بأحدث التقنيات الصوتية.'
      },
      {
        id: 'terra-terrace',
        name: 'Terra Terrace',
        nameAr: 'شرفة تيرا',
        type: 'terrace',
        typeLabel: 'Outdoor Terrace',
        typeLabelAr: 'شرفة خارجية',
        isIndoor: false,
        capacity: { standing: 300 },
        description: 'An outdoor terrace with stunning views.',
        descriptionAr: 'شرفة خارجية بإطلالات خلابة.'
      },
      {
        id: 'terra-rooftop',
        name: 'Terra Rooftop',
        nameAr: 'سطح تيرا',
        type: 'rooftop',
        typeLabel: 'Rooftop Space',
        typeLabelAr: 'مساحة السطح',
        isIndoor: false,
        capacity: { standing: 150 },
        description: 'A unique rooftop space for exclusive events.',
        descriptionAr: 'مساحة سطح فريدة للفعاليات الحصرية.'
      }
    ]
  },
  {
    id: 'mobility-district',
    name: 'Mobility District',
    nameAr: 'منطقة التنقل',
    description: 'Alif sparks excitement and curiosity about innovation and the future, offering inspiring spaces for forward-thinking events.',
    descriptionAr: 'ألف يثير الحماس والفضول حول الابتكار والمستقبل، ويوفر مساحات ملهمة للفعاليات المتطلعة للمستقبل.',
    image: alif,
    eventTags: ['Exhibition', 'Corporate Event', 'Product Launch', 'Innovation Forum'],
    eventTagsAr: ['معرض', 'فعالية مؤسسية', 'إطلاق منتج', 'منتدى الابتكار'],
    facilities: [
      {
        id: 'alif-the-bowl',
        name: 'Alif – The Bowl',
        nameAr: 'ألف – الحلبة',
        type: 'amphitheatre',
        typeLabel: 'Amphitheatre',
        typeLabelAr: 'مدرج',
        isIndoor: false,
        capacity: { standing: 1000 },
        description: 'A dynamic amphitheatre space for large gatherings.',
        descriptionAr: 'مساحة مدرج ديناميكية للتجمعات الكبيرة.'
      },
      {
        id: 'alif-north-space',
        name: 'Alif North Space',
        nameAr: 'مساحة ألف الشمالية',
        type: 'outdoor-space',
        typeLabel: 'Outdoor Event Space',
        typeLabelAr: 'مساحة فعاليات خارجية',
        isIndoor: false,
        capacity: { standing: 500 },
        description: 'Northern outdoor event space.',
        descriptionAr: 'مساحة فعاليات خارجية شمالية.'
      },
      {
        id: 'alif-south-space',
        name: 'Alif South Space',
        nameAr: 'مساحة ألف الجنوبية',
        type: 'outdoor-space',
        typeLabel: 'Outdoor Event Space',
        typeLabelAr: 'مساحة فعاليات خارجية',
        isIndoor: false,
        capacity: { standing: 500 },
        description: 'Southern outdoor event space.',
        descriptionAr: 'مساحة فعاليات خارجية جنوبية.'
      }
    ]
  },
  {
    id: 'conference-parks',
    name: 'Conference & Parks',
    nameAr: 'المؤتمرات والحدائق',
    description: 'Versatile conference facilities and beautiful outdoor parks for events of all sizes.',
    descriptionAr: 'مرافق مؤتمرات متعددة الاستخدامات وحدائق خارجية جميلة لفعاليات بجميع الأحجام.',
    image: jubileePark,
    eventTags: ['Conference', 'Seminar', 'Festival', 'Exhibition', 'Outdoor Gathering'],
    eventTagsAr: ['مؤتمر', 'ندوة', 'مهرجان', 'معرض', 'تجمع خارجي'],
    facilities: [
      {
        id: 'conference-hall-a',
        name: 'Conference Centre – Hall A',
        nameAr: 'مركز المؤتمرات – القاعة أ',
        type: 'conference-hall',
        typeLabel: 'Indoor Conference Hall',
        typeLabelAr: 'قاعة مؤتمرات داخلية',
        isIndoor: true,
        capacity: { seated: 400 },
        description: 'A versatile conference hall with modern amenities.',
        descriptionAr: 'قاعة مؤتمرات متعددة الاستخدامات مجهزة بأحدث المرافق.'
      },
      {
        id: 'jubilee-park',
        name: 'Jubilee Park',
        nameAr: 'حديقة اليوبيل',
        type: 'park',
        typeLabel: 'Outdoor Lawn / Park',
        typeLabelAr: 'حديقة / عشب خارجي',
        isIndoor: false,
        capacity: { standing: 10000 },
        description: 'A vast outdoor park perfect for large festivals and gatherings.',
        descriptionAr: 'حديقة خارجية واسعة مثالية للمهرجانات والتجمعات الكبيرة.'
      },
      {
        id: 'al-forsan-park',
        name: 'Al Forsan Park',
        nameAr: 'حديقة الفرسان',
        type: 'garden',
        typeLabel: 'Garden & Lawn',
        typeLabelAr: 'حديقة وعشب',
        isIndoor: false,
        capacity: { standing: 3000 },
        description: 'A beautiful garden space for outdoor events.',
        descriptionAr: 'مساحة حديقة جميلة للفعاليات الخارجية.'
      }
    ]
  }
];

// Updated bookings with venue site and facility
export const sampleBookings: Booking[] = [
  {
    id: 'EVD-2025-001',
    eventName: 'Sustainability Summit',
    eventNameAr: 'قمة الاستدامة',
    venueSiteId: 'terra',
    facilityId: 'terra-auditorium',
    date: '2025-02-15',
    status: 'Under Review',
    statusAr: 'قيد المراجعة'
  },
  {
    id: 'EVD-2025-002',
    eventName: 'Global Mobility Forum',
    eventNameAr: 'منتدى التنقل العالمي',
    venueSiteId: 'mobility-district',
    facilityId: 'alif-the-bowl',
    date: '2025-03-22',
    status: 'Approved',
    statusAr: 'موافق عليه'
  },
  {
    id: 'EVD-2025-003',
    eventName: 'Sustainable Innovation Summit 2025',
    eventNameAr: 'قمة الابتكار المستدام 2025',
    venueSiteId: 'al-wasl-plaza',
    facilityId: 'al-wasl-main-dome',
    date: '2025-03-15',
    status: 'Submitted',
    statusAr: 'مقدم'
  }
];

export const sampleUser: User = {
  name: 'Sara Al Mansoori',
  organization: 'Future Vision Events',
  email: 'sara.mansoori@futurevision.ae'
};

// Helper functions
export const getVenueSiteById = (id: string): VenueSite | undefined => {
  return venueSites.find(v => v.id === id);
};

export const getFacilityById = (venueSiteId: string, facilityId: string): Facility | undefined => {
  const site = getVenueSiteById(venueSiteId);
  return site?.facilities.find(f => f.id === facilityId);
};

export const getFacilityByIdGlobal = (facilityId: string): { site: VenueSite; facility: Facility } | undefined => {
  for (const site of venueSites) {
    const facility = site.facilities.find(f => f.id === facilityId);
    if (facility) {
      return { site, facility };
    }
  }
  return undefined;
};

export const getAllFacilities = (): { site: VenueSite; facility: Facility }[] => {
  const result: { site: VenueSite; facility: Facility }[] = [];
  for (const site of venueSites) {
    for (const facility of site.facilities) {
      result.push({ site, facility });
    }
  }
  return result;
};

export const getFacilityTypes = (): FacilityType[] => {
  return ['amphitheatre', 'terrace', 'function-room', 'theatre', 'rooftop', 'outdoor-space', 'conference-hall', 'park', 'garden'];
};

export const getFacilityTypeLabel = (type: FacilityType, isRTL: boolean): string => {
  const labels: Record<FacilityType, { en: string; ar: string }> = {
    'amphitheatre': { en: 'Amphitheatre', ar: 'مدرج' },
    'terrace': { en: 'Terrace', ar: 'شرفة' },
    'function-room': { en: 'Function Room', ar: 'غرفة مناسبات' },
    'theatre': { en: 'Theatre', ar: 'مسرح' },
    'rooftop': { en: 'Rooftop', ar: 'سطح' },
    'outdoor-space': { en: 'Outdoor Space', ar: 'مساحة خارجية' },
    'conference-hall': { en: 'Conference Hall', ar: 'قاعة مؤتمرات' },
    'park': { en: 'Park', ar: 'حديقة' },
    'garden': { en: 'Garden', ar: 'حديقة' }
  };
  return isRTL ? labels[type].ar : labels[type].en;
};

export const formatCapacity = (capacity: Capacity, isRTL: boolean): string => {
  const parts: string[] = [];
  if (capacity.standing) parts.push(isRTL ? `${capacity.standing} وقوف` : `${capacity.standing} standing`);
  if (capacity.seated) parts.push(isRTL ? `${capacity.seated} جلوس` : `${capacity.seated} seated`);
  if (capacity.banquet) parts.push(isRTL ? `${capacity.banquet} مأدبة` : `${capacity.banquet} banquet`);
  if (capacity.cocktail) parts.push(isRTL ? `${capacity.cocktail} كوكتيل` : `${capacity.cocktail} cocktail`);
  return parts.join(', ');
};

export const getMaxCapacity = (capacity: Capacity): number => {
  return Math.max(capacity.standing || 0, capacity.seated || 0, capacity.banquet || 0, capacity.cocktail || 0);
};

// Legacy compatibility - kept for backward compatibility during transition
export const venues: Venue[] = venueSites.flatMap(site => 
  site.facilities.map(facility => ({
    id: facility.id,
    name: facility.name,
    nameAr: facility.nameAr,
    type: facility.isIndoor ? 'indoor' as const : 'outdoor' as const,
    category: 'plaza' as const,
    typeLabel: facility.typeLabel,
    typeLabelAr: facility.typeLabelAr,
    capacity: getMaxCapacity(facility.capacity),
    description: facility.description || site.description,
    descriptionAr: facility.descriptionAr || site.descriptionAr,
    eventTags: site.eventTags,
    eventTagsAr: site.eventTagsAr,
    image: site.image
  }))
);

export const getVenueById = (id: string): Venue | undefined => {
  return venues.find(v => v.id === id);
};
