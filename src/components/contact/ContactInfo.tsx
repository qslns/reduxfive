import { Mail, Phone, MapPin, Instagram } from 'lucide-react';

export default function ContactInfo() {
  return (
    <div>
      <h2 className="heading-3 mb-8">Contact</h2>
      <p className="body-large text-gray-400 mb-12">
        Collaboration inquiries. Press requests. General questions.
      </p>
      
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <Mail className="text-gray-500 mt-1" size={20} />
          <div>
            <p className="font-medium mb-1">Email</p>
            <a 
              href="mailto:info@redux.kr" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              info@redux.kr
            </a>
          </div>
        </div>
        
        <div className="flex items-start gap-4">
          <Phone className="text-gray-500 mt-1" size={20} />
          <div>
            <p className="font-medium mb-1">Phone</p>
            <a 
              href="tel:+82-2-1234-5678" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              +82 2-1234-5678
            </a>
          </div>
        </div>
        
        <div className="flex items-start gap-4">
          <MapPin className="text-gray-500 mt-1" size={20} />
          <div>
            <p className="font-medium mb-1">Address</p>
            <p className="text-gray-400">
              Seoul, Seongdong-gu<br />
              REDUX Studio, 4F
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-4">
          <Instagram className="text-gray-500 mt-1" size={20} />
          <div>
            <p className="font-medium mb-1">Instagram</p>
            <a 
              href="https://instagram.com/redux_collective" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              @redux_collective
            </a>
          </div>
        </div>
      </div>
      
      <div className="mt-12 p-6 bg-zinc-900 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Hours</h3>
        <div className="space-y-2 text-gray-400">
          <p>Mon-Fri: 10:00 - 19:00</p>
          <p>Sat: 12:00 - 17:00</p>
          <p>Sun & Holidays: Closed</p>
        </div>
      </div>
    </div>
  );
}