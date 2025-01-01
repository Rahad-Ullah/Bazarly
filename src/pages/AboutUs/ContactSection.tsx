import { Building2, Mail, Phone } from "lucide-react";

const ContactSection = () => {
  return (
    <div className="py-10 md:py-16 grid gap-10">
      <div className="font-medium space-y-3">
        <span className="text-sm font-semibold border rounded-full px-3 py-1">
          Reach Out To Us
        </span>
        <h1 className="text-2xl md:text-3xl font-extrabold pt-2">
          We'd Love To Hear From You
        </h1>
        <p className="font-medium">
          Or just reach out manually to{" "}
          <span className="text-primary">sales@bazarly.com</span>
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4">
          <span className="inline-flex p-2 mb-3 bg-indigo-50 rounded-full text-primary">
            <Mail size={20} />
          </span>
          <h3 className="text-lg font-bold">Email Support</h3>
          <p className="text-sm">Our team can respond in real time.</p>
          <p className="mt-3 text-primary font-bold">sales@bazarly.com</p>
        </div>
        <div className="p-4">
          <span className="inline-flex p-2 mb-3 bg-indigo-50 rounded-full text-primary">
            <Building2 size={20} />
          </span>
          <h3 className="text-lg font-bold">Visit Our Office</h3>
          <p className="text-sm">Visit our office in real life.</p>
          <p className="mt-3 text-primary font-bold">
            1st floor, Islamic Tower, Golshan <br /> Dhaka-1200, Bangladesh.
          </p>
        </div>
        <div className="p-4">
          <span className="inline-flex p-2 mb-3 bg-indigo-50 rounded-full text-primary">
            <Phone size={20} />
          </span>
          <h3 className="text-lg font-bold">Call Us Directly</h3>
          <p className="text-sm">Available during working hours.</p>
          <p className="mt-3 text-primary font-bold">+880 1234-567890</p>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
