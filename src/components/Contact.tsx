import React from 'react';
import { Linkedin, Instagram, Phone, Mail } from 'lucide-react'; // Import Lucide icons

const Contact: React.FC = () => {
  return (
    <div className="text-white p-4">
      <h2 className="text-2xl font-bold mb-4">Contact</h2>
      <p>I’d love to connect and collaborate! Whether it’s discussing robotics, exploring philosophical ideas, or brainstorming sustainable solutions, feel free to reach out.</p>
      
      <p>
        <a href="mailto:david.metzler.2003@gmail.com" className="ml-2 text-[#efb314] hover:text-[#d19a09]">
          <Mail className="inline-block mr-2" size={20} />
          david.metzler.2003@gmail.com
        </a>
      </p>
      
      <p> 
        <a href="tel:+4915754439469" className="ml-2 text-[#efb314] hover:text-[#d19a09]">
          <Phone className="inline-block mr-2" size={20} />
          +49 1575 4439469
        </a>
      </p>

      <p>
        <a href="https://www.linkedin.com/in/david-metzler-2003/" className="ml-2 text-[#efb314] hover:text-[#d19a09]">
          <Linkedin className="inline-block mr-2" size={20} />
          LinkedIn Profile
        </a>
      </p>

      <p>
        <a href="https://www.instagram.com/david_metzler_21.01.2003/" className="ml-2 text-[#efb314] hover:text-[#d19a09]">
          <Instagram className="inline-block mr-2" size={20} />
          Instagram Profile
        </a>
      </p>

      <p>Let’s Collaborate: Whether you have an exciting project idea, need technical expertise, or just want to share ideas, drop me a message. I’m always open to new opportunities and adventures!</p>
    </div>
  );
};

export default Contact;
