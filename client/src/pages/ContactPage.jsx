import { useState } from 'react';
import toast from 'react-hot-toast';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Message from ${form.name} - Nithyam Divyam Website`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.open(`mailto:nithyamdivyam07@gmail.com?subject=${subject}&body=${body}`);
    toast.success('Opening email client... Thank you! 💚');
    setSent(true);
    setForm({ name: '', email: '', message: '' });
  };

  const contacts = [
    { icon: '📞', label: 'Phone', value: '+91 7306807443', link: 'tel:+917306807443' },
    { icon: '✉️', label: 'Email', value: 'nithyamdivyam07@gmail.com', link: 'mailto:nithyamdivyam07@gmail.com' },
    { icon: '📍', label: 'Location', value: 'Kajanaparai, Tamil Nadu, India', link: null },
    { icon: '📸', label: 'Instagram', value: '@nd._.spices', link: 'https://www.instagram.com/nd._.spices/' },
    { icon: '💬', label: 'WhatsApp', value: '+91 7306807443', link: 'https://wa.me/917306807443' },
  ];

  return (
    <div className="min-h-screen bg-bg animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-primary-dark py-20 text-white text-center px-4">
        <p className="text-secondary uppercase tracking-widest text-sm font-medium mb-3">Get In Touch</p>
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-white/70 max-w-lg mx-auto">Have a question about our spices? Want to place a bulk order? We'd love to hear from you!</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="font-heading text-2xl font-bold text-gray-800 mb-6">Reach Out Directly</h2>
            <div className="space-y-4 mb-10">
              {contacts.map(({ icon, label, value, link }) => (
                <div key={label} className="card p-4 flex items-center gap-4 hover:shadow-hover transition-all">
                  <span className="text-3xl">{icon}</span>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</p>
                    {link ? (
                      <a href={link} target={link.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                        className="text-gray-700 font-medium hover:text-primary transition-colors text-sm">
                        {value}
                      </a>
                    ) : (
                      <p className="text-gray-700 font-medium text-sm">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-3">💬</div>
              <h3 className="font-heading font-bold text-gray-800 mb-2">Fastest Response via WhatsApp</h3>
              <p className="text-gray-500 text-sm mb-4">We typically respond within minutes on WhatsApp!</p>
              <a
                href="https://wa.me/917306807443?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20your%20spices!"
                target="_blank"
                rel="noreferrer"
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card p-8">
            <h2 className="font-heading text-2xl font-bold text-gray-800 mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Enter your name" className="input-field" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className="input-field" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell us about your requirements, questions, or feedback..."
                  className="input-field resize-none"
                  required
                />
              </div>
              <button type="submit" className="btn-primary w-full justify-center py-4">
                ✉️ Send Message
              </button>
              {sent && <p className="text-green-600 text-sm text-center">✅ Thank you! We'll get back to you soon.</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
