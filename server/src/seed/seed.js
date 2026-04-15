require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const { sequelize, Category, Product, User } = require('../models');

const categories = [
  { name: 'Electronics', slug: 'electronics', icon: '📱' },
  { name: 'Fashion', slug: 'fashion', icon: '👗' },
  { name: 'Home & Kitchen', slug: 'home-kitchen', icon: '🏠' },
  { name: 'Books', slug: 'books', icon: '📚' },
  { name: 'Sports', slug: 'sports', icon: '⚽' },
  { name: 'Toys', slug: 'toys', icon: '🧸' },
];

const productsByCat = {
  electronics: [
    {
      name: 'Samsung Galaxy S24 Ultra 5G',
      brand: 'Samsung',
      price: 89999,
      original_price: 134999,
      rating: 4.5,
      rating_count: 12847,
      stock: 50,
      is_assured: true,
      images: [
        'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600',
        'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600',
        'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600',
      ],
      description: 'Experience the future of mobile with Samsung Galaxy S24 Ultra. Powered by Snapdragon 8 Gen 3, with a 200MP camera and integrated S Pen. The 6.8" QHD+ Dynamic AMOLED 2X display delivers stunning visuals.',
      highlights: ['200MP Main Camera with AI Zoom', 'Snapdragon 8 Gen 3 Processor', '5000mAh Battery with 45W Fast Charge', 'Integrated S Pen', '12GB RAM + 256GB Storage'],
      specifications: { 'Display': '6.8" QHD+ Dynamic AMOLED 2X', 'Processor': 'Snapdragon 8 Gen 3', 'RAM': '12GB', 'Storage': '256GB', 'Battery': '5000mAh', 'Camera': '200MP + 12MP + 10MP + 10MP', 'OS': 'Android 14' },
    },
    {
      name: 'Apple iPhone 15 Pro Max 256GB',
      brand: 'Apple',
      price: 134900,
      original_price: 159900,
      rating: 4.7,
      rating_count: 28341,
      stock: 30,
      is_assured: true,
      images: [
        'https://images.unsplash.com/photo-1705146368778-7a66aad23b27?w=600',
        'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=600',
        'https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=600',
      ],
      description: 'iPhone 15 Pro Max. Forged in titanium. The most powerful iPhone ever with A17 Pro chip, 5x telephoto camera system, and up to 4K 120fps ProRes video.',
      highlights: ['A17 Pro Chip with 3nm technology', '5x Optical Zoom Periscope Lens', 'Titanium Design', 'USB 3 for 2x faster transfers', '4K 120fps ProRes Video'],
      specifications: { 'Display': '6.7" Super Retina XDR ProMotion', 'Chip': 'A17 Pro', 'Storage': '256GB', 'Camera': '48MP Main + 12MP Ultra Wide + 12MP 5x Tele', 'Battery': 'Up to 29 hours video', 'OS': 'iOS 17' },
    },
    {
      name: 'Sony WH-1000XM5 Wireless Headphones',
      brand: 'Sony',
      price: 22990,
      original_price: 34990,
      rating: 4.6,
      rating_count: 8923,
      stock: 80,
      is_assured: true,
      images: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
        'https://images.unsplash.com/photo-1585298723682-7115561c51b7?w=600',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600',
      ],
      description: 'The Sony WH-1000XM5 delivers industry-leading noise cancelling with 8 microphones and Auto NC Optimizer. Enjoy 30 hours of battery and crystal-clear hands-free calling.',
      highlights: ['Industry-leading Noise Cancelling', '30 Hours Battery Life', '8 Mics for HD Calls', 'Speak-to-Chat technology', 'Foldable design'],
      specifications: { 'Type': 'Over-ear wireless', 'Driver': '30mm', 'Frequency': '4Hz–40,000Hz', 'Battery': '30 hours', 'Charging': 'USB-C', 'Weight': '250g' },
    },
    {
      name: 'Dell XPS 13 Plus Laptop',
      brand: 'Dell',
      price: 119990,
      original_price: 149990,
      rating: 4.4,
      rating_count: 3421,
      stock: 20,
      is_assured: false,
      images: [
        'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600',
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600',
        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600',
      ],
      description: 'Redefine what a laptop can be with Dell XPS 13 Plus. Featuring InfinityEdge display, Intel Core i7-1260P, and a revolutionary capacitive touch function row.',
      highlights: ['Intel Core i7-1260P 12th Gen', '13.4" OLED 3.5K Display', '32GB LPDDR5 RAM', '1TB NVMe SSD', 'No headphone jack – pure audio via USB-C'],
      specifications: { 'Processor': 'Intel Core i7-1260P', 'RAM': '32GB', 'Storage': '1TB SSD', 'Display': '13.4" OLED 3.5K 60Hz', 'Battery': '55WHr', 'OS': 'Windows 11 Pro' },
    },
    {
      name: 'boAt Airdopes 141 Bluetooth Earbuds',
      brand: 'boAt',
      price: 899,
      original_price: 2990,
      rating: 4.1,
      rating_count: 98234,
      stock: 500,
      is_assured: true,
      images: [
        'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600',
        'https://images.unsplash.com/photo-1610117-f2cece2bff28?w=600',
        'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600',
      ],
      description: 'boAt Airdopes 141 with 42H playtime, ENx technology for clear calls, and BEAST Mode for gaming. IPX4 water resistance for everyday use.',
      highlights: ['42 Hours Total Playtime', 'ENx Technology for Clear Calls', 'BEAST Mode for Gaming', 'IPX4 Water Resistance', 'Instant Connect'],
      specifications: { 'Driver': '8mm', 'Battery (Earbuds)': '30mAh each', 'Battery (Case)': '380mAh', 'Connectivity': 'Bluetooth 5.2', 'Charging': 'USB-C', 'Water Resistance': 'IPX4' },
    },
    {
      name: 'Apple Watch Series 9 GPS 45mm',
      brand: 'Apple',
      price: 42900,
      original_price: 47900,
      rating: 4.8,
      rating_count: 15678,
      stock: 45,
      is_assured: true,
      images: [
        'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600',
        'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600',
        'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=600',
      ],
      description: 'Apple Watch Series 9 with the new S9 chip, Double Tap gesture, always-on Retina display, and advanced health features including blood oxygen monitoring.',
      highlights: ['S9 Chip with Double Tap', 'Always-On Retina Display', 'Blood Oxygen & ECG', 'Crash Detection & Emergency SOS', '18-hour battery life'],
      specifications: { 'Display': '45mm LTPO OLED', 'Chip': 'S9 SiP', 'Health': 'Heart Rate, ECG, Blood Oxygen', 'GPS': 'Yes', 'Water Resistance': '50m', 'Battery': '18 hours' },
    },
  ],
  fashion: [
    {
      name: 'Levi\'s Men\'s 511 Slim Fit Jeans',
      brand: 'Levi\'s',
      price: 1799,
      original_price: 3999,
      rating: 4.3,
      rating_count: 22456,
      stock: 200,
      is_assured: true,
      images: [
        'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600',
        'https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=600',
        'https://images.unsplash.com/photo-1475178626620-a4d074967452?w=600',
      ],
      description: 'Levi\'s 511 Slim Jeans — the original slim. A comfortable, mid-rise fit that sits below the waist and is slim through the thigh and leg opening.',
      highlights: ['Slim Fit through thigh and leg', 'Mid-rise waist', '99% Cotton, 1% Elastane', 'Machine Washable', 'Available in multiple washes'],
      specifications: { 'Fit': 'Slim', 'Rise': 'Mid', 'Fabric': '99% Cotton, 1% Elastane', 'Closure': 'Zip fly with button', 'Care': 'Machine wash cold' },
    },
    {
      name: 'Nike Air Force 1 \'07 Sneakers',
      brand: 'Nike',
      price: 7495,
      original_price: 9495,
      rating: 4.6,
      rating_count: 34567,
      stock: 150,
      is_assured: true,
      images: [
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600',
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600',
        'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600',
      ],
      description: 'The Nike Air Force 1 \'07 borrows design cues from the original hoops shoe that started it all. Hoops-inspired details and classic b-ball styling celebrate the game\'s roots.',
      highlights: ['Perforated toe box for ventilation', 'Air-Sole unit for lightweight cushioning', 'Rubber outsole for durability', 'Pivot circle for multidirectional traction', 'Classic low-top silhouette'],
      specifications: { 'Upper': 'Leather', 'Sole': 'Rubber', 'Closure': 'Lace-up', 'Style': 'Low Top', 'Cushioning': 'Air-Sole unit' },
    },
    {
      name: 'Fabindia Women\'s Cotton Kurti',
      brand: 'Fabindia',
      price: 1299,
      original_price: 2100,
      rating: 4.2,
      rating_count: 8923,
      stock: 300,
      is_assured: false,
      images: [
        'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600',
        'https://images.unsplash.com/photo-1614093302611-8efc4a379d7e?w=600',
        'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600',
      ],
      description: 'Beautiful hand-block printed cotton kurti from Fabindia. Comfortable for everyday wear with intricate traditional patterns and vibrant colours.',
      highlights: ['100% Handloom Cotton', 'Hand-block printed design', 'Regular fit', 'Machine Washable', 'Available in sizes XS–XXL'],
      specifications: { 'Material': '100% Cotton', 'Print': 'Hand block', 'Fit': 'Regular', 'Occasion': 'Casual, Festive', 'Care': 'Machine wash gentle' },
    },
    {
      name: 'Allen Solly Men\'s Formal Shirt',
      brand: 'Allen Solly',
      price: 899,
      original_price: 1799,
      rating: 4.0,
      rating_count: 12340,
      stock: 400,
      is_assured: true,
      images: [
        'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600',
        'https://images.unsplash.com/photo-1603251579711-a0bbbfa5f4b8?w=600',
        'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600',
      ],
      description: 'Allen Solly Slim Fit formal shirt crafted from premium cotton blend. Perfect for office wear with a contemporary collar and slim silhouette.',
      highlights: ['60% Cotton, 40% Polyester blend', 'Slim fit silhouette', 'Spread collar', 'Full sleeve with adjustable cuffs', 'Wrinkle resistant'],
      specifications: { 'Material': '60% Cotton, 40% Polyester', 'Fit': 'Slim', 'Collar': 'Spread', 'Sleeve': 'Full', 'Care': 'Machine wash warm' },
    },
  ],
  'home-kitchen': [
    {
      name: 'Dyson V15 Detect Cordless Vacuum',
      brand: 'Dyson',
      price: 52900,
      original_price: 62900,
      rating: 4.7,
      rating_count: 4321,
      stock: 25,
      is_assured: false,
      images: [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
        'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=600',
        'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600',
      ],
      description: 'Dyson V15 Detect with laser-powered microscopic dust detection and HEPA filtration. The most powerful cordless vacuum with piezo sensor for real-time particle count.',
      highlights: ['Laser Thin Light reveals microscopic dust', 'Piezo Scientific Particle Counter', 'HEPA filter to expel clean air', '60-min battery runtime', 'Anti-tangle conical brush bar'],
      specifications: { 'Motor': 'Hyperdymium 240AW', 'Battery': '60 minutes', 'Weight': '3.1kg', 'Filtration': 'HEPA', 'Bin volume': '0.77L', 'Noise': '84dB' },
    },
    {
      name: 'Prestige IRIS 750W Mixer Grinder',
      brand: 'Prestige',
      price: 2199,
      original_price: 4995,
      rating: 4.3,
      rating_count: 34521,
      stock: 150,
      is_assured: true,
      images: [
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600',
        'https://images.unsplash.com/photo-1585515320310-259814833e62?w=600',
        'https://images.unsplash.com/photo-1430394229885-aaee2efb5d4e?w=600',
      ],
      description: 'Prestige IRIS 750W Mixer Grinder with 3 stainless steel jars for all your grinding and blending needs. Speed control and turbo mode for versatile cooking.',
      highlights: ['750W powerful motor', '3 Stainless Steel Jars (1.5L, 1L, 0.4L)', 'Speed control with turbo button', '2-year warranty', 'ISI marked'],
      specifications: { 'Power': '750W', 'Speed': '3 speed + Pulse', 'Jars': '3 SS jars', 'Warranty': '2 years on product, 5 years on motor', 'Voltage': '220-240V' },
    },
    {
      name: 'Philips Air Purifier AC1215/20',
      brand: 'Philips',
      price: 8999,
      original_price: 14999,
      rating: 4.4,
      rating_count: 7654,
      stock: 60,
      is_assured: false,
      images: [
        'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600',
        'https://images.unsplash.com/photo-1565183928294-7063f23ce0f8?w=600',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
      ],
      description: 'Philips Air Purifier removes 99.97% of allergens, bacteria, and viruses as small as 0.003 microns. Real-time air quality feedback with intelligent purification.',
      highlights: ['Removes 99.97% of particles down to 0.003µm', 'CADR 230m³/h – suitable for 310 sq ft', 'Real-time Air Quality Index display', 'Sleep mode – ultra quiet 33dB', 'HEPA + Active Carbon filter'],
      specifications: { 'CADR': '230 m³/h', 'Coverage': 'Up to 310 sq ft', 'Filter': 'HEPA + Active Carbon', 'Noise': '33–60dB', 'Power': '50W', 'Warranty': '2 years' },
    },
    {
      name: 'Milton Thermosteel Flip Lid Bottle 1000ml',
      brand: 'Milton',
      price: 649,
      original_price: 1199,
      rating: 4.5,
      rating_count: 56789,
      stock: 1000,
      is_assured: true,
      images: [
        'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600',
        'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=600',
        'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=600',
      ],
      description: 'Milton Thermosteel Flip Lid Bottle keeps beverages hot for 24 hours and cold for 24 hours. Food-grade stainless steel body with no-drip flip lid.',
      highlights: ['Keeps hot 24 hrs, cold 24 hrs', 'Food-grade 18/8 Stainless Steel', 'Flip lid – easy one-hand operation', 'Leak-proof design', 'BPA free'],
      specifications: { 'Capacity': '1000ml', 'Material': '18/8 Stainless Steel', 'Hot/Cold': '24 hours', 'Height': '30cm', 'Weight': '350g' },
    },
  ],
  books: [
    {
      name: 'Atomic Habits by James Clear',
      brand: 'Penguin Random House',
      price: 349,
      original_price: 799,
      rating: 4.8,
      rating_count: 98765,
      stock: 500,
      is_assured: true,
      images: [
        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600',
        'https://images.unsplash.com/photo-1481744072060-4cfda0d1a1d5?w=600',
        'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600',
      ],
      description: 'No.1 New York Times bestseller. Tiny changes, Remarkable Results. James Clear distills the most fundamental information about habit formation, inspiring an understanding of human nature.',
      highlights: ['#1 NY Times Bestseller', 'Practical step-by-step framework', '320 pages', 'Available in Paperback', 'International Bestseller'],
      specifications: { 'Author': 'James Clear', 'Publisher': 'Penguin Random House', 'Pages': '320', 'Language': 'English', 'ISBN': '9780735211292', 'Genre': 'Self-help' },
    },
    {
      name: 'The Psychology of Money by Morgan Housel',
      brand: 'Jaico Publishing',
      price: 299,
      original_price: 599,
      rating: 4.7,
      rating_count: 67890,
      stock: 400,
      is_assured: true,
      images: [
        'https://images.unsplash.com/photo-1589998059171-988d887df646?w=600',
        'https://images.unsplash.com/photo-1526243741027-444d633d7365?w=600',
        'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600',
      ],
      description: 'Timeless lessons on wealth, greed, and happiness. Morgan Housel shows how financial success is less about knowing the right formulas and more about behavior.',
      highlights: ['Bestseller with 3M+ copies sold', '19 short stories on finance & psychology', '256 pages', 'Simple but profound lessons', 'Recommended by Warren Buffett'],
      specifications: { 'Author': 'Morgan Housel', 'Publisher': 'Jaico Publishing', 'Pages': '256', 'Language': 'English', 'Genre': 'Finance / Psychology' },
    },
    {
      name: 'Introduction to Algorithms (CLRS) 4th Edition',
      brand: 'MIT Press',
      price: 1199,
      original_price: 2499,
      rating: 4.6,
      rating_count: 12345,
      stock: 80,
      is_assured: false,
      images: [
        'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600',
        'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600',
        'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600',
      ],
      description: 'The definitive textbook on algorithms, now updated in its 4th edition. Comprehensive coverage of data structures, graph algorithms, NP-completeness, and more.',
      highlights: ['4th Edition – Updated content', 'Covers ML algorithms chapter', '1312 pages of comprehensive content', 'Widely adopted in top CS universities', 'Co-authored by 4 MIT professors'],
      specifications: { 'Authors': 'Cormen, Leiserson, Rivest, Stein', 'Publisher': 'MIT Press', 'Pages': '1312', 'Edition': '4th (2022)', 'Language': 'English', 'ISBN': '9780262046305' },
    },
  ],
  sports: [
    {
      name: 'Cosco Championship Badminton Set',
      brand: 'Cosco',
      price: 899,
      original_price: 1799,
      rating: 4.2,
      rating_count: 8765,
      stock: 200,
      is_assured: false,
      images: [
        'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600',
        'https://images.unsplash.com/photo-1613918431703-aa50889e3be7?w=600',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600',
      ],
      description: 'Cosco Championship Badminton Set includes 2 full-size rackets and 3 shuttle cocks. High-strength aluminum frame with isometric head shape for a larger sweet spot.',
      highlights: ['2 Aluminum Rackets included', '3 Nylon Shuttlecocks included', 'Isometric head shape', 'Full cover included', 'Suitable for beginners to intermediate'],
      specifications: { 'Rackets': '2 Aluminum rackets', 'Shuttlecocks': '3 Nylon', 'Frame': 'Aluminum alloy', 'String': 'Synthetic gut', 'Grip size': 'Universal (G4)' },
    },
    {
      name: 'Skullcandy Crusher Wireless Gym Headphones',
      brand: 'Skullcandy',
      price: 3499,
      original_price: 8999,
      rating: 4.3,
      rating_count: 5678,
      stock: 90,
      is_assured: false,
      images: [
        'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600',
        'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600',
      ],
      description: 'Skullcandy Crusher Wireless with adjustable haptic bass and 40-hour battery. Built for the gym with sweat-resistant design and rapid charge technology.',
      highlights: ['Adjustable Haptic Bass Slider', '40 Hours Battery Life', 'Rapid Charge – 10min = 4hrs', 'Sweat & Water Resistant', 'Built-in microphone'],
      specifications: { 'Driver': '40mm', 'Frequency': '20Hz–20kHz', 'Battery': '40 hours', 'Connectivity': 'Bluetooth 5.2', 'Water Resistance': 'IPX4', 'Charging': 'USB-C' },
    },
    {
      name: 'Nivia Storm Football Size 5',
      brand: 'Nivia',
      price: 549,
      original_price: 999,
      rating: 4.1,
      rating_count: 23456,
      stock: 300,
      is_assured: false,
      images: [
        'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600',
        'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600',
        'https://images.unsplash.com/photo-1430232324554-8e656386b185?w=600',
      ],
      description: 'Nivia Storm Football Size 5 with machine-stitched PU outer for consistent touch and durable performance. Suitable for all weather conditions.',
      highlights: ['Size 5 – Standard match ball', 'Machine stitched PU material', 'All-weather performance', 'Latex bladder for air retention', 'Approved for training and matches'],
      specifications: { 'Size': '5', 'Material': 'PU outer', 'Bladder': 'Latex', 'Circumference': '68–70cm', 'Weight': '410–450g', 'Stitching': 'Machine stitched' },
    },
  ],
  toys: [
    {
      name: 'LEGO Technic Bugatti Bolide 42151',
      brand: 'LEGO',
      price: 7499,
      original_price: 9999,
      rating: 4.9,
      rating_count: 3456,
      stock: 40,
      is_assured: false,
      images: [
        'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=600',
        'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600',
        'https://images.unsplash.com/photo-1620218220543-d08aad1e9fdf?w=600',
      ],
      description: 'Build the iconic Bugatti Bolide hypercar in LEGO Technic! This 905-piece set features a detailed W16 engine, moving pistons, and authentic aerodynamic bodywork.',
      highlights: ['905 Pieces', 'Authentic Bugatti Bolide design', 'Moving W16 engine with pistons', 'Aerodynamic bodywork', 'Ages 10+'],
      specifications: { 'Pieces': '905', 'Age': '10+', 'Dimensions': '9" x 4" x 3"', 'Theme': 'Technic', 'Set Number': '42151', 'Difficulty': 'Medium' },
    },
    {
      name: 'Funskool Monopoly Classic Board Game',
      brand: 'Funskool',
      price: 549,
      original_price: 999,
      rating: 4.4,
      rating_count: 45678,
      stock: 250,
      is_assured: true,
      images: [
        'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=600',
        'https://images.unsplash.com/photo-1612404730960-5c71577fca11?w=600',
        'https://images.unsplash.com/photo-1566995541428-f2246c17cda1?w=600',
      ],
      description: 'The classic Funskool Monopoly game with an Indian edition board. Buy properties, build houses and hotels, and bankruptcy is the name of the game.',
      highlights: ['Indian edition with INR currency', '8 game tokens included', '2–8 players', 'Ages 8+', 'Family fun for 60–180 mins'],
      specifications: { 'Players': '2–8', 'Age': '8+', 'Duration': '60–180 min', 'Language': 'English', 'Edition': 'India Classic', 'Contents': 'Board, tokens, cards, money, dice' },
    },
    {
      name: 'Hasbro Nerf N-Strike Elite Strongarm Blaster',
      brand: 'Hasbro',
      price: 1299,
      original_price: 2499,
      rating: 4.5,
      rating_count: 9876,
      stock: 120,
      is_assured: false,
      images: [
        'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600',
        'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=600',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
      ],
      description: 'The Nerf N-Strike Elite Strongarm fires darts up to 27m! Slam-fire action lets you unleash all 6 darts rapidly. Flip-up sight for better targeting.',
      highlights: ['Fires up to 27 meters', '6-dart rotating barrel', 'Slam-fire action', 'Flip-up sight included', '6 Elite darts included'],
      specifications: { 'Range': 'Up to 27m', 'Capacity': '6 darts', 'Dart type': 'Elite', 'Action': 'Slam-fire', 'Age': '8+', 'Batteries': 'None required' },
    },
  ],
};

async function seed() {
  try {
    await sequelize.authenticate();
    console.log('✅ DB connected');
    await sequelize.sync({ force: true });
    console.log('✅ Tables reset');

    // Create default user
    const user = await User.create({ name: 'Yash Verma', email: 'yash@flipkart.com', phone: '9876543210' });
    console.log('✅ Default user created');

    // Create categories
    const catMap = {};
    for (const cat of categories) {
      const c = await Category.create(cat);
      catMap[cat.slug] = c.id;
    }
    console.log('✅ Categories seeded');

    // Create products
    let totalProducts = 0;
    for (const [slug, products] of Object.entries(productsByCat)) {
      for (const p of products) {
        await Product.create({ ...p, category_id: catMap[slug] });
        totalProducts++;
      }
    }
    console.log(`✅ ${totalProducts} products seeded`);
    console.log('🎉 Seed complete!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err);
    process.exit(1);
  }
}

seed();
