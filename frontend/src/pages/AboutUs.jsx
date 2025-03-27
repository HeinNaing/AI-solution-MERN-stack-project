const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="hero bg-base-200 rounded-box mb-8">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold">About Us</h1>
            <p className="py-6">Pioneering AI Solutions for a Better Tomorrow</p>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="card bg-primary text-primary-content">
          <div className="card-body">
            <h2 className="card-title text-3xl mb-4">Our Mission</h2>
            <p>To democratize artificial intelligence by creating innovative solutions that empower businesses and individuals to harness the full potential of AI technology.</p>
          </div>
        </div>
        <div className="card bg-secondary text-secondary-content">
          <div className="card-body">
            <h2 className="card-title text-3xl mb-4">Our Vision</h2>
            <p>To be the leading force in AI innovation, driving positive change through accessible and ethical artificial intelligence solutions.</p>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">Our Core Values</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="badge badge-lg mb-4">01</div>
              <h3 className="card-title">Innovation</h3>
              <p>Pushing boundaries and exploring new possibilities in AI technology</p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="badge badge-lg mb-4">02</div>
              <h3 className="card-title">Ethics</h3>
              <p>Committed to responsible and ethical AI development</p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <div className="badge badge-lg mb-4">03</div>
              <h3 className="card-title">Excellence</h3>
              <p>Delivering high-quality solutions that exceed expectations</p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">Our Team</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              name: "Dr. Sarah Chen",
              role: "AI Research Lead",
              image: "https://i.pravatar.cc/150?img=1"
            },
            {
              name: "Michael Rodriguez",
              role: "Lead Developer",
              image: "https://i.pravatar.cc/150?img=2"
            },
            {
              name: "Emma Watson",
              role: "Product Manager",
              image: "https://i.pravatar.cc/150?img=3"
            },
            {
              name: "James Wilson",
              role: "ML Engineer",
              image: "https://i.pravatar.cc/150?img=4"
            }
          ].map((member, index) => (
            <div key={index} className="card bg-base-100 shadow-xl">
              <figure className="px-10 pt-10">
                <div className="avatar">
                  <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={member.image} alt={member.name} />
                  </div>
                </div>
              </figure>
              <div className="card-body items-center text-center">
                <h3 className="card-title">{member.name}</h3>
                <p className="text-sm text-base-content/70">{member.role}</p>
                <div className="card-actions">
                  <button className="btn btn-ghost btn-sm">Contact</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="card bg-base-200">
        <div className="card-body">
          <h2 className="card-title text-3xl text-center mb-6">Get in Touch</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input type="text" placeholder="Your name" className="input input-bordered" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" placeholder="Your email" className="input input-bordered" />
            </div>
            <div className="form-control md:col-span-2">
              <label className="label">
                <span className="label-text">Message</span>
              </label>
              <textarea className="textarea textarea-bordered h-24" placeholder="Your message"></textarea>
            </div>
            <div className="md:col-span-2 flex justify-center">
              <button className="btn btn-primary">Send Message</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
