import React, { useState } from 'react';
import { useParams, Link } from 'react-router';
import { motion } from 'framer-motion';
import * as FaIcons from 'react-icons/fa';

const SoftwareSolution = () => {
    const { id } = useParams();
    const [selectedSolution, setSelectedSolution] = useState(null);

    const industrialSolutions = {
        manufacturing: {
            title: "Manufacturing Solutions",
            icon: <FaIcons.FaIndustry className="text-4xl" />, // Keeping JSX for clarity here, convert to string if needed for JSON
            hero: {
                heading: "Smart Manufacturing Solutions",
                subheading: "Transform your manufacturing processes with our cutting-edge AI-driven software solutions",
                image: "https://images.unsplash.com/photo-1543967708-2418d2e7748c?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8U21hcnQlMjBNYW51ZmFjdHVyaW5nJTIwU29sdXRpb25zfGVufDB8fDB8fHww"
            },
            overview: "Leverage AI and IoT to optimize every stage of your production cycle, from predictive maintenance to supply chain efficiency, driving significant cost savings and productivity gains.",
            solutions: [
                {
                    id: "m1", // Changed ID to string for consistency
                    title: "Smart Factory Management",
                    icon: <FaIcons.FaRobot className="text-3xl" />,
                    image: "https://images.unsplash.com/photo-1716194583732-0b9874234218?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U21hcnQlMjBNYW51ZmFjdHVyaW5nJTIwU29sdXRpb25zfGVufDB8fDB8fHww", // Added image path
                    description: "Comprehensive factory management system with real-time monitoring and control.",
                    features: [
                        "Real-time production monitoring & OEE tracking",
                        "AI-driven anomaly detection",
                        "Automated quality control alerts",
                        "Resource optimization dashboard"
                    ],
                    benefits: [
                        "Up to 30% increase in productivity",
                        "Reduced machine downtime",
                        "Improved defect detection rate",
                        "Lower operational costs"
                    ]
                },
                {
                    id: "m2", // Changed ID to string
                    title: "Predictive Maintenance System",
                    icon: <FaIcons.FaTools className="text-3xl" />,
                    image: "https://images.unsplash.com/photo-1717386255773-a456c611dc4e?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8U21hcnQlMjBNYW51ZmFjdHVyaW5nJTIwU29sdXRpb25zfGVufDB8fDB8fHww", // Added image path
                    description: "AI-powered maintenance prediction and scheduling using sensor data.",
                    features: [
                        "Machine learning failure prediction models",
                        "Automated maintenance scheduling",
                        "Spare parts lifecycle tracking & inventory optimization",
                        "Maintenance cost analysis"
                    ],
                    benefits: [
                        "Up to 50% reduction in unexpected downtime",
                        "Extended equipment lifespan",
                        "Optimized MRO inventory levels",
                        "Improved workplace safety"
                    ]
                },
                {
                    id: "m3", // Changed ID to string
                    title: "Supply Chain Optimization",
                    icon: <FaIcons.FaLink className="text-3xl" />, // Changed Icon
                    image: "https://images.unsplash.com/photo-1716191299980-a6e8827ba10b?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fFNtYXJ0JTIwTWFudWZhY3R1cmluZyUyMFNvbHV0aW9uc3xlbnwwfHwwfHx8MA%3D%3D", // Added image path
                    description: "End-to-end supply chain visibility and optimization platform powered by AI.",
                    features: [
                        "Real-time inventory tracking & management",
                        "AI-driven demand forecasting",
                        "Intelligent supplier coordination & risk assessment",
                        "Logistics route optimization"
                    ],
                    benefits: [
                        "Reduced inventory holding costs",
                        "Improved on-time delivery rates",
                        "Enhanced supply chain resilience",
                        "Better strategic planning accuracy"
                    ]
                }
            ],
            technologies: [
                { name: "Cloud Computing", icon: <FaIcons.FaCloud /> },
                { name: "IoT Integration", icon: <FaIcons.FaServer /> },
                { name: "Mobile Apps", icon: <FaIcons.FaMobile /> },
                { name: "AI & Machine Learning", icon: <FaIcons.FaBrain /> } // Changed Icon
            ]
        },
        healthcare: {
            title: "Healthcare Solutions",
            icon: <FaIcons.FaHospital className="text-4xl" />,
            hero: {
                heading: "Advanced Healthcare Technology",
                subheading: "Revolutionize patient care and streamline operations with our secure and intelligent healthcare software.",
                image: "https://plus.unsplash.com/premium_photo-1673953509975-576678fa6710?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGVhbHRoY2FyZXxlbnwwfHwwfHx8MA%3D%3D"
            },
            overview: "From AI-powered diagnostics support to efficient hospital management, our solutions enhance patient outcomes, improve operational workflows, and ensure data security.",
            solutions: [ // Added Healthcare Solutions Data
                {
                    id: "h1",
                    title: "Patient Care Analytics Platform",
                    icon: <FaIcons.FaChartBar className="text-3xl" />,
                    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhbHRoY2FyZXxlbnwwfHwwfHx8MA%3D%3D", // Added image path
                    description: "AI-driven analytics platform for improving patient outcomes and operational efficiency.",
                    features: [
                        "Predictive patient risk scoring (e.g., readmission, complications)",
                        "Treatment effectiveness analysis & comparison",
                        "Hospital resource allocation optimization",
                        "Real-time clinical dashboarding"
                    ],
                    benefits: [
                        "Improved patient outcomes & safety",
                        "Optimized staffing and resource utilization",
                        "Reduced operational bottlenecks",
                        "Enhanced quality reporting and compliance (e.g., HIPAA)"
                    ]
                },
                {
                    id: "h2",
                    title: "Medical Imaging AI Assistant",
                    icon: <FaIcons.FaMicroscope className="text-3xl" />,
                    image: "https://images.unsplash.com/photo-1706065264583-55f1a8549769?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8TWVkaWNhbCUyMEltYWdpbmclMjBBSSUyMEFzc2lzdGFudHxlbnwwfHwwfHx8MA%3D%3D", // Added image path
                    description: "AI tools to assist radiologists and clinicians in analyzing medical images faster and more accurately.",
                    features: [
                        "Automated anomaly detection support (e.g., nodules, fractures)",
                        "Image segmentation and quantitative measurements",
                        "Integration with existing PACS systems",
                        "Prioritization workflow assistance"
                    ],
                    benefits: [
                        "Faster diagnostic support & report turnaround",
                        "Improved accuracy and consistency in analysis",
                        "Reduced clinician workload for repetitive tasks",
                        "Enhanced early detection capabilities"
                    ]
                },
                {
                    id: "h3",
                    title: "Intelligent Hospital Management System (HMS)",
                    icon: <FaIcons.FaLaptopMedical className="text-3xl" />,
                    image: "https://images.unsplash.com/photo-1664902265139-934219cee42f?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fE1lZGljYWwlMjBJbWFnaW5nJTIwQUklMjBBc3Npc3RhbnR8ZW58MHx8MHx8fDA%3D", // Added image path
                    description: "Integrated system powered by AI for managing patient records, billing, scheduling, and operations.",
                    features: [
                        "Smart Electronic Health Records (EHR) with AI insights",
                        "AI-assisted appointment scheduling & optimization",
                        "Automated billing and insurance claim processing",
                        "Predictive inventory management for pharmacy & supplies"
                    ],
                    benefits: [
                        "Streamlined hospital workflows",
                        "Reduced administrative overhead & errors",
                        "Improved patient flow and experience",
                        "Enhanced data security and regulatory compliance"
                    ]
                }
            ],
            technologies: [
                { name: "Cloud Computing (HIPAA Compliant)", icon: <FaIcons.FaCloud /> },
                { name: "Data Security & Encryption", icon: <FaIcons.FaLock /> },
                { name: "Mobile Health Apps", icon: <FaIcons.FaMobile /> },
                { name: "AI Diagnostics Support & NLP", icon: <FaIcons.FaBrain /> } // Changed icon/name slightly
            ]
        },
        education: {
            title: "Education Solutions",
            icon: <FaIcons.FaGraduationCap className="text-4xl" />,
            hero: {
                heading: "Innovative Educational Technology",
                subheading: "Transform learning experiences and administrative efficiency with our smart education software.",
                image: "https://images.unsplash.com/photo-1637580688480-00c8722d8767?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SW5ub3ZhdGl2ZSUyMEVkdWNhdGlvbmFsJTIwVGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D"
            },
            overview: "Empower educators and students with cutting-edge Learning Management Systems, insightful analytics, and engaging virtual classroom tools designed for the future of education.",
            solutions: [ // Added Education Solutions Data
                {
                    id: "e1",
                    title: "AI-Powered Learning Management System (LMS)",
                    icon: <FaIcons.FaBookOpen className="text-3xl" />,
                    image: "https://images.unsplash.com/photo-1569653402334-2e98fbaa80ee?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fElubm92YXRpdmUlMjBFZHVjYXRpb25hbCUyMFRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D", // Added image path
                    description: "Intelligent platform for personalized course delivery, adaptive learning paths, and collaboration.",
                    features: [
                        "AI-driven personalized content recommendations",
                        "Automated grading assistance & plagiarism detection",
                        "Integrated collaboration tools (forums, chat, groups)",
                        "Real-time student progress tracking dashboards"
                    ],
                    benefits: [
                        "Increased student engagement & retention",
                        "Personalized learning at scale",
                        "Reduced administrative workload for educators",
                        "Improved accessibility and flexibility"
                    ]
                },
                {
                    id: "e2",
                    title: "Student Success Analytics",
                    icon: <FaIcons.FaChartPie className="text-3xl" />,
                    image: "https://images.unsplash.com/photo-1623287072519-d224cfbac5a1?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aW5ub3ZhdGl2ZSUyMGVkdWNhdGlvbmFsJTIwdGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D", // Added image path
                    description: "Predictive analytics tools to track student progress, identify at-risk students early, and inform interventions.",
                    features: [
                        "Predictive modeling for student success & dropout risk",
                        "Early warning system dashboard for advisors/faculty",
                        "Personalized learning pathway suggestions",
                        "Curriculum effectiveness and engagement analysis"
                    ],
                    benefits: [
                        "Improved student retention and graduation rates",
                        "Proactive and targeted student support",
                        "Data-driven instructional and curriculum decisions",
                        "Enhanced overall educational outcomes"
                    ]
                },
                {
                    id: "e3",
                    title: "Next-Gen Virtual Classroom Platform",
                    icon: <FaIcons.FaVideo className="text-3xl" />,
                    image: "https://plus.unsplash.com/premium_photo-1682124189039-f015d2ba4b75?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TmV4dCUyMEdlbiUyMFZpcnR1YWwlMjBDbGFzc3Jvb20lMjBQbGF0Zm9ybXxlbnwwfHwwfHx8MA%3D%3D", // Added image path
                    description: "Interactive and engaging platform for live online classes, featuring AI moderation and analytics.",
                    features: [
                        "HD video conferencing with recording & transcription",
                        "AI-powered interactive whiteboard & polling",
                        "Automated attendance tracking & engagement monitoring",
                        "Breakout rooms with collaborative tools"
                    ],
                    benefits: [
                        "Engaging and accessible remote learning experiences",
                        "Improved classroom management tools",
                        "Actionable insights into student participation",
                        "Seamless integration with LMS"
                    ]
                }
            ],
            technologies: [
                { name: "Cloud Learning Platform", icon: <FaIcons.FaCloud /> },
                { name: "Mobile Learning Apps", icon: <FaIcons.FaMobile /> },
                { name: "Real-time Communication (WebRTC)", icon: <FaIcons.FaVideo /> }, // Clarified tech
                { name: "Educational Data Mining & AI", icon: <FaIcons.FaChartBar /> } // Clarified tech
            ]
        },
        retail: {
            title: "Retail Solutions",
            icon: <FaIcons.FaShoppingCart className="text-4xl" />, // Example Icon
            hero: {
                heading: "Next-Generation Retail Technology",
                subheading: "Enhance customer experiences and streamline operations with our intelligent retail software.",
                image: "https://images.unsplash.com/photo-1556740714-a8395b3bf30f?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UmV0YWlsJTIwVGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D" // Example relevant image
            },
            overview: "Drive sales and efficiency with integrated E-commerce platforms, smart inventory management, and insightful customer analytics tailored for the modern retail landscape.",
            solutions: [
                {
                    id: "r1",
                    title: "AI-Powered E-commerce Platform",
                    icon: <FaIcons.FaStore className="text-3xl" />, // Example Icon
                    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZSUyMGNvbW1lcmNlfGVufDB8fDB8fHww", // Example E-commerce image
                    description: "Scalable online storefront with personalized shopping experiences and integrated marketing tools.",
                    features: [
                        "AI-driven product recommendations & personalization",
                        "Seamless, secure checkout process (multi-currency/payment)",
                        "Mobile-first responsive design",
                        "Integrated marketing & SEO tools",
                        "Order management & fulfillment integration"
                    ],
                    benefits: [
                        "Increased online sales & conversion rates",
                        "Enhanced customer engagement & loyalty",
                        "Wider market reach (global potential)",
                        "Streamlined online store management",
                        "Improved brand visibility"
                    ]
                },
                {
                    id: "r2",
                    title: "Smart Inventory Management",
                    icon: <FaIcons.FaBoxes className="text-3xl" />, // Example Icon
                    image: "https://plus.unsplash.com/premium_photo-1682145744991-96bf8a02fc61?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U21hcnQlMjBJbnZlbnRvcnklMjBNYW5hZ2VtZW50fGVufDB8fDB8fHww", // Example Inventory image
                    description: "Optimize stock levels, reduce waste, and automate replenishment using real-time data and predictive analytics.",
                    features: [
                        "Real-time inventory tracking across all channels (online/offline)",
                        "Automated reordering & low-stock alerts",
                        "AI-powered demand forecasting",
                        "Barcode/RFID scanning integration",
                        "Multi-location warehouse management"
                    ],
                    benefits: [
                        "Reduced stockouts and overstocking",
                        "Minimized carrying costs and waste",
                        "Improved order fulfillment accuracy & speed",
                        "Increased operational efficiency",
                        "Better cash flow management"
                    ]
                },
                {
                    id: "r3",
                    title: "Customer Analytics & Personalization Engine",
                    icon: <FaIcons.FaChartLine className="text-3xl" />, // Example Icon
                    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3VzdG9tZXIlMjBhbmFseXRpY3N8ZW58MHx8MHx8fDA%3D", // Example Analytics image
                    description: "Gain deep insights into customer behavior and preferences to deliver targeted marketing and personalized experiences.",
                    features: [
                        "360-degree customer view & segmentation",
                        "Purchase history & behavior analysis",
                        "Predictive analytics for churn & lifetime value (CLV)",
                        "Personalized offer & promotion engine",
                        "Omnichannel campaign performance tracking"
                    ],
                    benefits: [
                        "Increased customer loyalty & retention",
                        "Higher marketing ROI through targeted campaigns",
                        "Improved customer satisfaction & experience",
                        "Data-driven merchandising and pricing decisions",
                        "Enhanced cross-selling and up-selling opportunities"
                    ]
                }
            ],
            technologies: [
                { name: "Cloud E-commerce Platforms", icon: <FaIcons.FaCloudUploadAlt /> }, // Example Icon
                { name: "Point of Sale (POS) Systems", icon: <FaIcons.FaCashRegister /> }, // Example Icon
                { name: "Big Data & Analytics", icon: <FaIcons.FaDatabase /> }, // Example Icon
                { name: "AI & Machine Learning", icon: <FaIcons.FaBrain /> }, // Example Icon
                { name: "CRM Integration", icon: <FaIcons.FaUsersCog /> } // Example Icon
            ]
        },
        finance: {
            title: "Financial Technology Solutions",
            icon: <FaIcons.FaUniversity className="text-4xl" />, // Example Icon for financial institutions
            hero: {
                heading: "Secure & Efficient Financial Software",
                subheading: "Modernize financial operations, enhance security, and improve customer experiences with our fintech solutions.",
                image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmluYW5jZXxlbnwwfHwwfHx8MA%3D%3D" // Example relevant finance image
            },
            overview: "Empower financial institutions and businesses with robust core banking systems, seamless payment processing, and sophisticated risk management tools built for security, compliance, and growth.",
            solutions: [
                {
                    id: "f1",
                    title: "Modern Core Banking Software",
                    icon: <FaIcons.FaServer className="text-3xl" />, // Example Icon for core systems
                    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJhbmtpbmclMjBzb2Z0d2FyZXxlbnwwfHwwfHx8MA%3D%3D", // Example Banking software image
                    description: "Comprehensive platform for managing accounts, transactions, loans, and customer data securely and efficiently.",
                    features: [
                        "Customer account management (deposits, withdrawals, statements)",
                        "Integrated loan origination and servicing modules",
                        "Real-time, high-volume transaction processing engine",
                        "Automated regulatory compliance reporting (e.g., Basel III, AML)",
                        "Open API layer for third-party integrations (Open Banking)"
                    ],
                    benefits: [
                        "Increased operational efficiency and reduced manual processes",
                        "Enhanced data security, integrity, and regulatory compliance",
                        "Improved customer service through unified data views",
                        "Faster deployment of new financial products and services",
                        "Scalable architecture to support business growth"
                    ]
                },
                {
                    id: "f2",
                    title: "Secure Payment Gateway Integration",
                    icon: <FaIcons.FaCreditCard className="text-3xl" />, // Example Icon for payments
                    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGF5bWVudCUyMGdhdGV3YXl8ZW58MHx8MHx8fDA%3D", // Example Payment gateway image
                    description: "Facilitate secure online, mobile, and point-of-sale payments with robust fraud detection and multi-currency support.",
                    features: [
                        "Support for diverse payment methods (Credit/Debit Cards, Wallets, ACH, BNPL)",
                        "PCI-DSS compliant security protocols and tokenization",
                        "AI-powered fraud detection and prevention engine",
                        "Real-time transaction monitoring, authorization, and reporting",
                        "Seamless API/SDK for website, mobile app, and POS integration"
                    ],
                    benefits: [
                        "Increased payment conversion rates and revenue",
                        "Significant reduction in fraud losses and chargebacks",
                        "Enhanced customer trust through secure and convenient checkout",
                        "Streamlined payment operations and reconciliation",
                        "Global market access with multi-currency processing"
                    ]
                },
                {
                    id: "f3",
                    title: "AI-Driven Risk Management Platform",
                    icon: <FaIcons.FaShieldAlt className="text-3xl" />, // Example Icon for risk/security
                    image: "https://images.unsplash.com/photo-1559526324-c1f275fbfa32?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmlzayUyMG1hbmFnZW1lbnR8ZW58MHx8MHx8fDA%3D", // Example Risk management image
                    description: "Identify, assess, monitor, and mitigate financial risks (credit, market, operational, compliance) using predictive analytics and AI.",
                    features: [
                        "Predictive credit scoring models for individuals and businesses",
                        "Real-time market risk monitoring, VaR calculations, and alerts",
                        "Automated AML (Anti-Money Laundering) & KYC (Know Your Customer) checks",
                        "Operational risk event tracking and heat mapping",
                        "Sophisticated scenario analysis and stress testing capabilities"
                    ],
                    benefits: [
                        "Reduced credit losses through better underwriting decisions",
                        "Improved adherence to regulatory requirements (avoiding fines)",
                        "Proactive identification and mitigation of market volatility impacts",
                        "Enhanced strategic decision-making based on risk insights",
                        "Minimized potential for operational failures and reputational damage"
                    ]
                }
            ],
            technologies: [
                { name: "Secure Cloud Computing (AWS, Azure, GCP)", icon: <FaIcons.FaCloud /> }, // Example Icon
                { name: "Blockchain & Distributed Ledger Tech", icon: <FaIcons.FaLink /> }, // Example Icon
                { name: "AI & Machine Learning (Risk, Fraud, Personalization)", icon: <FaIcons.FaBrain /> }, // Example Icon
                { name: "Big Data Analytics Platforms", icon: <FaIcons.FaDatabase /> }, // Example Icon
                { name: "API Management & Microservices", icon: <FaIcons.FaConnectdevelop /> }, // Example Icon
                { name: "Advanced Cryptography & Security", icon: <FaIcons.FaKey /> } // Example Icon
            ]
        },
        "business-intelligence": {
            title: "Business Intelligence Solutions",
            icon: <FaIcons.FaChartBar className="text-4xl" />, // Example Icon for BI/Analytics
            hero: {
                heading: "Data-Driven Decision Making",
                subheading: "Unlock actionable insights from your data with our comprehensive Business Intelligence tools and platforms.",
                image: "https://plus.unsplash.com/premium_photo-1661434555552-c9d7c640b9c2?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8RGF0YSUyMERyaXZlbiUyMERlY2lzaW9uJTIwTWFraW5nfGVufDB8fDB8fHww" // Example relevant BI image
            },
            overview: "Transform raw data into strategic assets. Our BI solutions provide powerful data analytics, intuitive reporting, and real-time performance monitoring to empower smarter business decisions across your organization.",
            solutions: [
                {
                    id: "bi1",
                    title: "Advanced Data Analytics Platform",
                    icon: <FaIcons.FaProjectDiagram className="text-3xl" />, // Example Icon for complex analysis
                    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGRhdGElMjBhbmFseXRpY3N8ZW58MHx8MHx8fDA%3D", // Example Data Analytics image
                    description: "Explore complex datasets, discover hidden patterns, uncover correlations, and predict future trends using sophisticated analytical tools.",
                    features: [
                        "Self-service data discovery and exploration tools",
                        "Predictive modeling, forecasting, and what-if analysis",
                        "Advanced statistical analysis capabilities (clustering, regression, segmentation)",
                        "Seamless integration with diverse data sources (databases, APIs, flat files, cloud storage)",
                        "AI-powered insights generation and natural language querying (NLQ)"
                    ],
                    benefits: [
                        "Deeper understanding of customer behavior, market trends, and operational bottlenecks",
                        "Improved accuracy in forecasting sales, demand, and resource needs",
                        "Identification of hidden opportunities for growth and optimization",
                        "Data-backed strategic planning and decision making",
                        "Empowerment of analysts and data scientists to derive valuable insights"
                    ]
                },
                {
                    id: "bi2",
                    title: "Interactive Business Reporting & Dashboards",
                    icon: <FaIcons.FaFileAlt className="text-3xl" />, // Example Icon for reporting
                    image: "https://images.unsplash.com/photo-1560415755-bd80d06eda60?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YnVzaW5lc3MlMjByZXBvcnRpbmd8ZW58MHx8MHx8fDA%3D", // Example Reporting/Dashboard image
                    description: "Create, automate, and distribute insightful, visually appealing reports and dashboards to track key business metrics.",
                    features: [
                        "Intuitive drag-and-drop interface for report and dashboard creation",
                        "Library of customizable charts, graphs, and data visualization widgets",
                        "Automated report generation and scheduled distribution (email, PDF, embedded)",
                        "Interactive filtering, sorting, and drill-down capabilities for users",
                        "Role-based access control and secure sharing options"
                    ],
                    benefits: [
                        "Clear and concise communication of business performance across departments",
                        "Improved data accessibility and understanding for non-technical users",
                        "Significant reduction in time and effort spent on manual reporting tasks",
                        "Alignment of teams around common goals and metrics (KPIs)",
                        "Enhanced transparency and accountability within the organization"
                    ]
                },
                {
                    id: "bi3",
                    title: "Real-Time Performance Monitoring & Alerts",
                    icon: <FaIcons.FaTachometerAlt className="text-3xl" />, // Example Icon for monitoring/speed
                    image: "https://plus.unsplash.com/premium_photo-1663050693144-6b5bc76d2214?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UmVhbCUyMFRpbWUlMjBQZXJmb3JtYW5jZSUyME1vbml0b3JpbmclMjAlMjYlMjBBbGVydHxlbnwwfHwwfHx8MA%3D%3D", // Example Monitoring/Dashboard image
                    description: "Continuously track Key Performance Indicators (KPIs) in real-time and receive automated notifications for critical deviations or anomalies.",
                    features: [
                        "Live, auto-refreshing dashboards displaying up-to-the-minute KPIs",
                        "Configurable alert rules based on thresholds, trends, or anomalies",
                        "Multi-channel alert delivery (email, SMS, in-app notifications, webhook)",
                        "AI-driven anomaly detection to spot unusual patterns",
                        "Root cause analysis features to quickly investigate performance changes"
                    ],
                    benefits: [
                        "Proactive identification and faster resolution of business issues",
                        "Immediate visibility into operational performance and critical events",
                        "Improved ability to meet service level agreements (SLAs) and targets",
                        "Reduced risk by catching problems before they escalate",
                        "Data-driven adjustments to operations and strategy in near real-time"
                    ]
                }
            ],
            technologies: [
                { name: "Data Warehousing (Snowflake, Redshift, BigQuery)", icon: <FaIcons.FaWarehouse /> }, // Example Icon
                { name: "ETL/ELT Tools (Informatica, Talend, Fivetran)", icon: <FaIcons.FaSyncAlt /> }, // Example Icon
                { name: "OLAP Cubes & In-Memory Analytics", icon: <FaIcons.FaCube /> }, // Example Icon
                { name: "Data Visualization Libraries (D3.js, Plotly)", icon: <FaIcons.FaPaintBrush /> }, // Example Icon
                { name: "Leading BI Platforms (Tableau, Power BI, Looker, Qlik)", icon: <FaIcons.FaChartPie /> }, // Example Icon
                { name: "Streaming Data Processing (Kafka, Spark Streaming)", icon: <FaIcons.FaStream /> } // Example Icon
            ]
        }
        // Add other industries (Retail, Finance, Business Intelligence) here
        // following the same structure if needed.
    };

    const currentIndustry = industrialSolutions[id];

    if (!currentIndustry) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-lg mx-4">
                    <div className="text-6xl text-blue-500 mb-6 flex justify-center">
                        <FaIcons.FaTimes />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Industry Not Found</h1>
                    <p className="text-gray-600 mb-8">The industry you're looking for doesn't exist or hasn't been added yet.</p>
                    <Link to="/solutions" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 max-w-xs mx-auto">
                        <span>View All Solutions</span>
                        <FaIcons.FaLongArrowAltRight />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pt-10">
            {/* Hero Section */}
            <div className="relative w-full bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
                <div className="absolute inset-0">
                    <img
                        src={currentIndustry.hero.image}
                        alt={currentIndustry.hero.heading}
                        className="w-full h-full object-cover opacity-90"
                    />
                </div>
                <div className="relative container mx-auto px-4 py-24">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            {currentIndustry.hero.heading}
                        </h1>
                        <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
                            {currentIndustry.hero.subheading}
                        </p>
                        <p className="mt-8 text-lg opacity-80 max-w-2xl mx-auto">
                            {currentIndustry.overview}
                        </p>
                    </div>
                </div>
            </div>

            {/* Solutions Section */}
            <div className="py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Solutions</h2>
                        <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
                    </div>

                    {currentIndustry.solutions.map((solution, index) => (
                        <div
                            key={solution.id}
                            className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center mb-24 last:mb-0`}
                        >
                            {/* Image Section */}
                            <div className="w-full lg:w-1/2">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="rounded-xl overflow-hidden shadow-xl"
                                >
                                    <img
                                        src={solution.image}
                                        alt={solution.title}
                                        className="w-full h-auto object-cover aspect-video"
                                    />
                                </motion.div>
                            </div>

                            {/* Content Section */}
                            <div className="w-full lg:w-1/2">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="text-3xl text-blue-500">
                                            {solution.icon}
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-800">{solution.title}</h3>
                                    </div>

                                    <p className="text-gray-600 mb-6 leading-relaxed">{solution.description}</p>

                                    <div className="mb-6">
                                        <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                                            <span className="w-6 h-1 bg-blue-500 mr-3"></span>
                                            Key Features
                                        </h4>
                                        <div className="space-y-2 pl-3">
                                            {solution.features.map((feature, idx) => (
                                                <div key={idx} className="flex items-start gap-3">
                                                    <FaIcons.FaCheckCircle className="text-blue-500 mt-1 flex-shrink-0" />
                                                    <p className="text-gray-700">{feature}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {/* 
                                    <button
                                        onClick={() => setSelectedSolution(solution)}
                                        className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
                                    >
                                        <span>Learn More</span>
                                        <FaLongArrowAltRight />
                                    </button> */}
                                </motion.div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Technologies Section */}
            <div className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Technologies We Use</h2>
                        <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {currentIndustry.technologies.map((tech, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="text-4xl text-blue-500 mb-4">{tech.icon}</div>
                                <h3 className="font-semibold text-gray-800">{tech.name}</h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Solution Detail Modal */}
            {selectedSolution && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-xl p-0 max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
                    >
                        <div className="h-64 relative">
                            <img
                                src={selectedSolution.image}
                                alt={selectedSolution.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                            <button
                                onClick={() => setSelectedSolution(null)}
                                className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-colors"
                            >
                                <FaTimes className="text-xl" />
                            </button>
                            <div className="absolute bottom-6 left-8 text-white">
                                <div className="flex items-center gap-4">
                                    <div className="text-3xl">
                                        {selectedSolution.icon}
                                    </div>
                                    <h2 className="text-3xl font-bold">{selectedSolution.title}</h2>
                                </div>
                            </div>
                        </div>

                        <div className="p-8">
                            <p className="text-gray-600 mb-8 leading-relaxed text-lg">{selectedSolution.description}</p>

                            <div className="grid md:grid-cols-2 gap-8 mb-8">
                                <div className="bg-blue-50 p-6 rounded-lg">
                                    <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                                        <span className="w-6 h-1 bg-blue-500 mr-3"></span>
                                        Key Features
                                    </h3>
                                    <ul className="space-y-3">
                                        {selectedSolution.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center gap-3">
                                                <FaIcons.FaCheckCircle className="text-blue-500 flex-shrink-0" />
                                                <span className="text-gray-700">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-indigo-50 p-6 rounded-lg">
                                    <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                                        <span className="w-6 h-1 bg-indigo-500 mr-3"></span>
                                        Benefits
                                    </h3>
                                    <ul className="space-y-3">
                                        {selectedSolution.benefits.map((benefit, idx) => (
                                            <li key={idx} className="flex items-center gap-3">
                                                <FaIcons.FaCheckCircle className="text-indigo-500 flex-shrink-0" />
                                                <span className="text-gray-700">{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="text-center">
                                <button
                                    onClick={() => setSelectedSolution(null)}
                                    className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
                                >
                                    <span>Close Details</span>
                                    <FaIcons.FaTimes />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default SoftwareSolution;
