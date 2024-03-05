'use client';

import 'styles/apply.css';

import { useState } from 'react';
import { Stepper, Button, Group, TextInput, Checkbox, Fieldset, NumberInput, Select, MultiSelect, Autocomplete } from '@mantine/core';
import { useForm } from '@mantine/form';

import classes from 'styles/searchbox.module.css';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import { setRegistered } from 'features/userSlice';

import Link from "next/link";

import Registered from 'components/Registered';

import { notifications } from '@mantine/notifications';

import { register, setName } from 'utils/Utils';
import AuthenticationForm from 'components/AuthenticationForm';

const schools = ["21st Century Cyber Charter School", "Aalto University", "Aarhus University", "Abbey Park High School", "Abbey Park Middle School", "Abertay University", "ABES Engineering College", "Abington Senior High School", "Abraham Lincoln High School", "Abraham Lincoln High School - Philadelphia", "Academy at Palumbo", "Academy of Technology", "Acardia High School, Arizona", "Achariya College of Engineering Technology", "Acharya Institute of Technology", "Acharya Institute of Technology (AIT)", "Acharya Narendra Dev College, University Of Delhi", "Achievement House Charter School - Online", "Acropolis Institute of Technology & Research", "ACT Academy Cyber Charter School", "Acton-Boxborough Regional High School", "Adelphi University", "Aditya Institute of Technology and Management (AITAM College, Tekkali)", "Adlai E. Stevenson High School", "Advanced Math and Science Academy Charter School", "AGH University of Science and Technology", "Agnes Scott College", "Agora Cyber Charter School", "Alagappa Chettiar Government College of Engineering and Technology", "Alagappa College of Technology, Anna University", "Alameda High School", "Albany Medical College", "Albany State University (GA)", "Albertian Institute of Science and Technology (AISAT)", "Albright College", "Alfa College", "Aligarh Muslim University", "Allen High School", "Alwar Institute of Engineering and Technology (AIET)", "Ambala College of Engineering and Applied Research", "Ambedkar Institute of Advanced Communication Technologies and Research (AIACTR)", "AMC Engineering College", "American Heritage School", "American High School", "American River College, California", "American University in Dubai", "American University, Washington, D.C.", "Amherst College", "Amity School of Engineering and Technology", "Amity University", "Amrita School of Engineering", "Amritsar College of Engineering & Technology", "Anand Institute of Higher Technology", "Ancaster High School", "Anchor Bay High School", "Andhra University College of Engineering", "Andover Central High School", "Angadi Institute of Technology & Management (AITM)", "Anil Neerukonda Institute of Technology and Sciences", "Anjalai Ammal Mahalingam Engineering College", "Anna University", "Ansal Technical Campus, Dr. A.P.J Abdul Kalam Technical University", "Anurag University, Ghatkesar", "Apeejay Stya University", "APPA Institute of Engineering and Technology", "Appalachian State University", "APS College of Engineering", "Aravali Institute of Technical Studies", "Arcadia High School, California", "Arcadia University", "Arizona State University", "Army Institute Of Technology, Pune", "Art Institute of Philadelphia", "Arya College of Engineering & I.T.", "Asansol Engineering College", "Ashoka Institute of Technology and Management", "Asia Pacific Institute of Information Technology, Panipat", "Asia Pacific University of Information & Technology, Kuala Lumpur", "Asian School of Business Management (ASBM University)", "ASPIRA Bilingual Cyber Charter School", "Assam Downtown University", "Assam Engineering College", "Assam University, Silchar", "Aston University", "Atal Bihari Vajpayee Indian Institute of Information Technology and Management, Gwalior (ABV-IIITM Gwalior)", "Atlanta Metropolitan State College", "Atlantic Cape Community College", "Atma Ram Sanatan Dharma College", "ATME College of Engineering", "Atria Institute of Technology", "Auburn University", "Audisankara College of Engineering and Technology", "Aurora Group of Institutions", "Austin Community College District", "Aviation Career & Technical Education High School", "Avon High School", "B. P. Poddar Institute of Management and Technology", "B. V. Bhoomaraddi College of Engineering and Technology (KLE Tech)", "B.M.S College Of Engineering", "B.N.M Institute of Technology", "Babaria Institute of Technology", "Babson College", "Babu Banarasi Das National Institute of Technology and Management", "Babu Banarasi Das Northern India Institute of Technology", "Babu Banarsi Das Institute of Technology", "Badruka Educational Society", "Bahria University Lahore Campus", "Ball State University", "Baltimore Polytechnic Institute", "Bangalore Institute of Technology", "Bangalore University", "Bannari Amman Institute of Technology", "Bapuji Institute Of Engineering & Technology (BIET)", "Bard College", "Barnard College", "Barton College", "Baruch College, CUNY", "Basaveshwar Engineering College", "Baton Rouge Community College", "Battlefield High School", "Bauman Moscow State Technical University", "Bayside High School", "Bayview Secondary School", "Beihang University", "Bellevue College, Washington", "Benedictine College", "Benha University", "Benjamin Franklin High School - Baltimore", "Benjamin Franklin High School - Philadelphia", "Bennett College", "Bennett University (Times of India Group)", "Bentley University", "Berea College", "Bergen Catholic High School", "Bergen Community College", "Bergen County Academies", "Bergen County Technical High School - Teterboro", "Berkshire Community College", "Bhagalpur College of Engineering", "Bhagwan Parshuram Institute of Technology", "Bharat Institute of Engineering and Technology (BIET)", "Bharathiar University", "Bharati Vidyapeeth's College of Engineering", "Bilkent University", "Bineswar Brahma Engineering College (BBEC)", "Binghamton University", "Birkbeck, University of London", "Birla Institute of Technology and Science, Pilani", "Birla Institute Of Technology,  Mesra", "Birla Institute of Technology, Patna", "Birla Vishvakarma Mahavidyalaya Engineering College", "Birmingham City University", "Birsa Institute of Technology (BIT), SINDRI", "BITS Pilani, Hyderabad Campus", "BITS Pilani, K K Birla Goa Campus", "BLDEAâ€™s V.P. Dr P. G. Halakatti College of Engineering & Technology", "Blinn College", "Bloomfield Hills High School", "Bloomsburg University of Pennsylvania", "Blue Mountain Academy", "BlueCrest University College", "Bluevale Collegiate Institute", "BMIET, Sonipat", "BMIIT, Uka Tarsadia University, Bardoli, Surat", "BML Munjal University (BMU)", "BMS Institute of Technology and Management", "Boca Raton Community High School", "Boise State University", "Bordentown Regional High School", "Borough of Manhattan Community College, CUNY", "Boston College", "Boston Latin School", "Boston University", "Boston University Metropolitan College", "Bourne Grammar School", "Bournemouth University", "Bowdoin College", "Bowie State University", "Boys Latin of Philadelphia Charter School", "Brampton Centennial Secondary School", "Brandeis University", "Brentsville High School", "Briar Cliff University", "Briarcliff High School", "Bridgewater State University", "Brigham Young University", "British Columbia Institute of Technology", "Brno University of Technology", "Brock University", "Bronx Community College, CUNY", "Brookdale Community College", "Brooklyn College, CUNY", "Brooklyn Technical High School", "Brookwood High School", "Brown University", "Brunel University London", "Bryn Athyn College", "Bryn Mawr College", "Bucknell University", "Bucks County Community College", "Bundelkhand Institute Of Engineering & Technology (BIET Jhansi)", "Burlington Township High School", "Business Academy Aarhus", "BVRIT Hyderabad College of Engineering for Women", "C. Abdul Hakeem College of Engineering & Technology", "C. D. Hylton High School", "C. K. Pithawala College of Engineering and Technology", "C.V. Raman College of Engineering", "Cabrini University", "Cadbury Sixth Form College", "Cairn University", "Caldwell University", "California High School", "California Institute of Technology", "California Polytechnic State University, San Luis Obispo", "California State Polytechnic University, Pomona", "California State University, Bakersfield", "California State University, Channel Islands", "California State University, Chico", "California State University, Dominguez Hills", "California State University, East Bay", "California State University, Fresno", "California State University, Fullerton", "California State University, Humboldt", "California State University, Long Beach", "California State University, Los Angeles", "California State University, Maritime", "California State University, Monterey Bay", "California State University, Northridge", "California State University, Sacramento", "California State University, San Bernardino", "California State University, San Diego", "California State University, San Francisco", "California State University, San Jose", "California State University, San Luis Obispo", "California State University, San Marcos", "California State University, Sonoma", "California State University, Stanislaus", "California University of Pennsylvania", "Calvin College", "Camden County College", "Cameron Heights Collegiate Institute", "Canada (CaÃ±ada) College", "Canara Engineering College (CEC)", "Canyon Crest Academy", "CAPA - Philadelphia High School for Creative and Performing Arts", "Cardiff Metropolitan University", "Carleton College", "Carleton University", "Carnegie Mellon University", "Carteret High School", "Carthage College", "Cascadia College", "Case Western Reserve University", "Cathedral High School, Los Angeles", "Catholic University of America", "Cedar Creek High School", "Cedar Ridge High School", "Cedarville University", "Centennial Collegiate Vocational Institute", "Centennial High School", "Central Connecticut State University", "Central High School - Philadelphia", "Central Institute of Plastics Engineering & Technology (CIPET)", "Central PA Digital Learning Foundation Charter School", "Central Peel Secondary School", "Central Texas College", "Centro de EnseÃ±anza TÃ©cnica y Superior (CETYS), Campus Ensenada", "Centro de EnseÃ±anza TÃ©cnica y Superior (CETYS), Campus Mexicali", "Cerritos College", "Chaitanya Bharathi Institute of Technology", "Chalmers University of Technology", "Champlain College", "Chandigarh College Of Engineering & Technology (CCET)", "Chandigarh University", "Channabasaveshwara Institute of Technology", "Chaparral Star Academy", "Chapel Hill High School", "Charotar University Of Science And Technology (CHAURSAT)", "Charter High School for Architecture and Design - Philadelphia", "Chattahoochee Technical College", "Cherokee High School", "Cherry Hill High School East", "Cherry Hill High School West", "Chestnut Hill College", "Cheyney University", "Chinguacousy Secondary School", "Chitkara Institute of Engineering & Technology (CIET)", "Chitkara University", "Christ College of Engineering and Technology", "Christ Knowledge City", "Christ University", "Christ University Faculty of Engineering", "Cincinnati State Technical and Community College", "Citrus College", "City College of San Francisco", "City Engineering College", "City Neighbors High School", "City University London", "Claremont McKenna College", "Clarion University of Pennsylvania", "Clark Atlanta University", "Clark University", "Clarksburg High School", "Clarkson University", "Clayton State University", "Clemson University", "Cleveland State University", "Clifton Public Highschool", "Cluster Innovation Centre, University of Delhi", "CMR College of Engineering and Technology,  Hyderabad", "CMR Engineering College", "CMR Institute of Technology (CMRIT)", "CMR Technical Campus", "Cochin College of Engineering and Technology", "Cochin University College of Engineering Kuttanad", "Cochin University of Science And Technology", "Cochin University of Science and Technology", "CODE University of Applied Sciences Berlin", "Coe College", "Coimbatore Institute of Engineering and Technology (CIET)", "Coimbatore Institute of Technology (CIT)", "Colegio SimÃ³n BolÃ­var", "Colgate University", "College of Agricultural Engineering and Post Harvest Technology (CAEPHT)", "College of Agriculture, Central Agricultural University", "College of Charleston", "College of DuPage", "College of Engineering & Management Punnapra", "College of Engineering and Management, Kolaghat", "College of Engineering Chengannur", "College of Engineering, Pune", "College of Staten Island, CUNY", "College of Technology & Engineering, Udaipur", "College of Westchester", "Colleyville Heritage High School", "Collins Hill High School", "CollÃ¨ge Ahuntsic", "CollÃ¨ge AndrÃ©-Grasset", "CollÃ¨ge de Bois-de-Boulogne", "CollÃ¨ge de Maisonneuve", "CollÃ¨ge de MontrÃ©al", "CollÃ¨ge de Rosemont", "CollÃ¨ge FranÃ§ais", "CollÃ¨ge Jean-de-BrÃ©beuf", "CollÃ¨ge Jean-Eudes", "CollÃ¨ge Lionel-Groulx", "CollÃ¨ge Regina Assumpta", "Colorado School of Mines", "Colts Neck High School", "Columbia Secondary School", "Columbia University", "Columbus College of Art and Design", "Columbus State Community College", "Comenius University", "Commonwealth Charter Academy Charter School", "Community Academy of Philadelphia Charter School", "Community College of Allegheny County", "Community College of Baltimore County", "Community College of Philadelphia", "Community College of Rhode Island", "COMSATS Institute of Information Technology", "Concord Academy", "Concordia University", "Concordia University Ann Arbor", "Concordia University Chicago", "Concordia University Irvine", "Concordia University Nebraska", "Concordia University St. Paul", "Concordia University Texas", "Concordia University Wisconsin", "Conestoga College", "Conestoga High School", "Connecticut College", "Conroe ISD Academy of Science and Technology, Texas", "Constitution High School - Philadelphia", "Cooch Behar Government Engineering College", "Cooper Union", "Coral Glades High School", "Cornell College", "Cornell University", "Council Rock High School North", "Council Rock High School South", "County College of Morris", "Covenant University", "Coventry University", "Cranbrook Schools", "Cranfield University", "Creekview High School", "Cumberland County College", "Cummins College of Engineering for Women,  Pune", "Cupertino High School", "CÃ©gep AndrÃ©-Laurendeau", "CÃ©gep de Saint-Laurent", "CÃ©gep du Vieux MontrÃ©al", "CÃ©gep Marie-Victorin", "D.J. College of Engineering & Technology", "D.K.T.E Society's Textile and Engineering Institute", "Dalhousie University", "Dalmia Institute of Scientific & Industrial Research", "Dartmouth College", "Davidson College", "Dawson College", "Dayalbagh Educational Institute", "Dayananda Sagar University", "DCS,  Ganpat University", "De Anza College", "Deenbandhu Chhotu Ram University of Science and Technology, Murthal", "Deerfield High School", "Del Norte High School", "Delaware County Community College - Downingtown", "Delaware County Community College - Exton", "Delaware County Community College - Main Campus (Marple)", "Delaware County Community College - Phoenixville", "Delaware County Community College - Sharon Hill", "Delaware County Community College - Upper Darby", "Delaware County Community College - West Grove", "Delaware State University", "Delaware Technical Community College", "Delaware Valley Academy of Medical and Dental Assistants", "Delaware Valley University", "Delft University of Technology", "Delhi Technological University", "Denison University", "Department of Human Resource Management and OB, Central University of Jammu", "DePaul University", "DePauw University", "Des Moines Area Community College", "DeSales University", "Devry University - Philadelphia Center City", "Dharmsinh Desai University", "Dhirubhai Ambani Institute of Information and Communication Technology (DA-IICT)", "Diablo Valley College", "Dickinson College", "Digital Harbor High School", "DIT University", "Don Bosco College of Engineering", "Don Bosco College of Engineering and Technology", "Don Bosco Institute of Technology", "Doon College of Engineering & Technology", "Dougherty Valley High School", "Dr B. R. Ambedkar Institute of Technology,  Port Blair", "Dr. A.P.J. Abdul Kalam Technical University, Lucknow", "Dr. Akhilesh Das Gupta Institute of Technology & Management", "Dr. B. R. Ambedkar National Institute of Technology Jalandhar", "Dr. B.C. Roy Engineering College, Durgapur", "Dr. Babasaheb Ambedkar Marathwada University", "Dr. Harisingh Gour University, Sagar University", "Dr. K.N. Modi Engineering College", "Dr. MGR Educational Research Institute University", "Dr. SJS Paul Memorial College of Engineering and Technology (CIT)", "Dr. T. Thimmaiah Institute of Technology", "Drake University", "Drew University", "Drexel University", "Dublin High School", "Dublin Jerome High School", "Duke University", "Dulaney High School", "Duquesne University", "Durant High School", "Durham College", "Durham University", "Dwarkadas J. Sanghvi College of Engineering", "Dwight-Englewood School", "Earl of March Secondary School", "Earlham College", "East Brunswick High School", "East Central University", "East Chapel Hill High Schoo", "East Los Angeles College", "East Point College of Engineering and Technology", "East Stroudsburg High School", "East West Institute of Technology", "EASTERN Center for Arts and Technology", "Eastern High School - Louisville", "Eastern Michigan University", "Eastern Regional High School", "Eastern University - St. Davids", "Eastern University Academy Charter School", "Eastern Washington University", "Eckerd College", "ecole centrale marseille", "Edina High School", "Edinburgh Napier University", "Edison Academy", "Edison High School", "Edward R. Murrow High School", "Egg Harbor Township High School", "EidgenÃ¶ssische Technische Hochschule (ETH) ZÃ¼rich", "Ekta Incubation Center, West Bengal", "El Camino College", "El Centro College", "El Centro de Estudiantes", "Elgin Academy", "Elizabeth High School", "Elon University", "Embry-Riddle Aeronautical University", "Emory University", "Entrepreneurship Development Center, MIT, Pune", "Entreprpeneurship Development Cell, University of Kerala", "EPFL | Ã‰cole polytechnique fÃ©dÃ©rale de Lausanne", "Episcopal Academy", "EPITECH Bordeaux", "Er.Perumal Manimekalai College of Engineering", "Erasmus Hogeschool Brussel", "Erie Community College", "Ernest Manning High School", "Esperanza Academy Charter School", "Esperanza Cyber Charter School", "Evergreen Valley College", "Evergreen Valley High School", "Fachhochschule Dortmund", "Faculty Of Engineering & Technology, Gurukula Kangri Vishwavidyalaya", "Faculty of science / Ibn Tofail University", "Fahaheel Al-Watanieh Indian Private School", "Fairfield University", "Fairleigh Dickinson University", "Fairview High School", "Farmingdale State College", "FernUniversitÃ¤t in Hagen", "Finolex Academy of Management and Technology", "First Philadelphia Preparatory Charter School", "Fitchburg State University", "Florida Agricultural & Mechanical (A&M) University", "Florida Atlantic University", "Florida Gulf Coast University", "Florida Institute Of Technology", "Florida International University", "Florida Polytechnic University", "Florida State University", "Fontys Hogeschool", "Foothill College", "Fordham University", "Forest Heights Collegiate Institute", "Forest Park High School - Baltimore", "Forest Park High School - Forest Park, GA", "Forest Park High School - Woodbridge", "Fort Scott Community College", "Foundation Collegiate Academy", "Foundation for Innovation and Technology Transfer, IIT Delhi", "Fr. Conceicao Rodrigues College of Engineering", "Francis Holland School", "Francis Lewis High School", "Frankford High School - Philadelphia", "Franklin High School", "Franklin Learning Center - Philadelphia", "Franklin Towne Charter High School", "Franklin W. Olin College of Engineering", "Frederick Community College", "Freedom High School - Bethlehem", "Freedom High School - Woodbridge", "Freehold High School", "Freire Charter High School", "Fremont High School", "Full Sail University", "Fullerton College", "G. H. Patel College of Engineering & Technology", "G. Narayanamma Institute of Technology Science (For Women)", "G.H. Raisoni College of Engineering", "Galgotias College of Engineering & Technology", "Gandhi Institute of Technical Advancement (GITA)", "Gandhi Institute of Technology and Management, Bengaluru", "Gandhi Institute of Technology and Management, Hyderabad", "Gandhi Institute of Technology and Management, Visakhapatnam", "Gandhi Institution of Management Studies", "Ganga International School", "Ganpat University", "Gar-Field Senior High School", "Garnet Valley High School", "Gautam Buddha University", "Gaya College Of Engineering", "Gayatri Vidya Parishad College of Engineering", "GEC, Gandhinagar", "GEC, Patan", "Geetanjali Institute of Technical Studies (GITS)", "Geethanjali College of Engineering and Technology", "George C. Marshall High School", "George Heriot's School", "George Mason University", "George Washington High School - Philadelphia", "Georgetown University", "Georgia Institute of Technology", "Georgia State University", "Germantown Friends School", "Geroge Washington Carver High School - Philadelphia", "Ghent University", "Ghousia College of Engineering", "GIDC Degree Engineering College", "Girijananda Chowdhury Institute of Management and Technology (GIMT)", "GITAM Centre for Integrated Rural Development", "Gitam School of Technology", "GL Bajaj Institute of Technology and Management", "Glassboro High School", "Glenaeon Rudolf Steiner School", "Glenbrook North High School", "Glenbrook South High School", "Glendale Community College", "Glenforest Secondary School", "Global Academy of Technology", "GMR Institute of Technology", "Goa College of Engineering", "GOA IT INNOVATION CENTRE", "Gokaraju Rangaraju Institute of Engineering and Technology (GRIET)", "Goldsmiths, University of London", "Gopalan College of Engineering and Management", "Gordon Graydon Memorial Secondary School", "Gottfried Wilhelm Leibniz UniversitÃ¤t Hannover", "Government College of Engineering & Technology, Jammu", "Government College Of Engineering, Amravati", "Government College Of Engineering, Aurangabad", "Government College of Engineering, Bargur", "Government College of Engineering, Kalahandi", "Government College of Engineering, Kannur", "Government College Of Engineering, Karad", "Government College of Engineering, Salem", "Government College of Technology, Coimbatore", "Government Engineering College Palakkad, Sreekrishnapuram", "Government Engineering College, Ajmer", "Government Engineering College, Banswara", "Government Engineering College, Hassan", "Government Engineering College, Kozhikode", "Government Engineering College, Thrissur", "Government Model Engineering College, Thrikkakara", "Government Polytechnic Gandhinagar", "Government Sri Krishnarajendra Silver Jubilee Technological Institute", "Governor's School for Science & Technology", "Govind Ballabh Pant Institute of Engineering & Technology", "Grady High School", "Grand Rapids Community College", "Grand Valley State University", "Graphic Era University", "Great Neck South High School", "Greater Lowell Technical High School", "Green River College", "Greenwood College School", "Grinnell College", "GSSS Institute of Engineering & Technology for Women", "Guelph Collegiate Vocational Institute", "Gujarat Energy Research and Management Institute (GERMI)", "Gujarat Technological University", "Gujarat University", "Guru Ghasidas Vishwavidyalaya, Bilaspur", "Guru Gobind Singh Indraprastha University", "Guru Jambheshwar University of Science and Technology (GJUS&T), HISAR", "Guru Jambheshwar University of Science and Technology, Hisar", "Guru Nanak Dev Engineering College", "Guru Nanak Institutions", "Guru Tegh Bahadur Institute of Technology (GTBIT)", "Gurukula Kangri University", "Guttman Community College, CUNY", "Gwalior Engineering College", "Gwinnett Technical College", "Gwynedd Mercy University", "GZS Campus College of Engineering & Technology", "H.N. Werkman College", "Haaga-Helia University of Applied Sciences", "Haldia Institute of Technology", "Hamilton College", "Hamline University", "Hampshire College", "Hampton University", "HAN University of Applied Sciences", "Hanze University of Applied Sciences", "Harcourt Butler Technical University, Kanpur", "Harcum College", "Harper College", "Harrisburg Area Community College", "Harrisburg University - Harrisburg Campus", "Harrisburg University - Philadelphia Campus", "Harrison Career Institute", "Harvard Medical School", "Harvard University", "Harvey Mudd University", "Haryana Engineering College", "Hasso-Plattner-Institut Academy", "Haverford College", "Hazleton Area High School", "Head-Royce School", "Health Careers High School", "Heartland Community College", "Helwan University", "Henry M. Gunn High School", "Herguan University", "Heritage Institute of Technology", "Het Baarnsch Lyceum", "Hi-Tech Institute of Engineering & Technology", "Hi-Tech Institute of Technology", "High Technology High School", "Highland Park High School", "Hightstown High School", "Hillsborough Community College", "Hillsborough High School", "Hindustan College of Science & Technology", "Hindustan Institute of Technology & Science", "Hinsdale Central High School", "Hiram College", "Hirasugar Institute of Technology, Nidasoshi", "HKBK College of Engineering", "HMR Institute of Technology & Management, GGSIPU", "HMS Institute of Technology", "Hofstra University", "Hogeschool Thomas More", "Hogeschool van Amsterdam", "Holton-Arms School", "Holy Family University", "Homestead High School", "Hong Kong University of Science and Technology", "Hood College", "Horace Furness High School", "Horace Mann School", "Hostos Community College, CUNY", "Houghton High School", "Houston Community College", "Howard University", "Hudson County Community College", "Hudson Valley Community College", "Hunter College High School", "Hunter College, CUNY", "Huron Heights Secondary School", "Hussian School of Art", "I.K. Gujral Punjab Technical University Jalandhar (IKGPTU)", "I.T.S Engineering College", "IAN Mentoring and Incubation Services", "IIMT College of Engineering, Greater Noida", "IIMT College Of Medical Sciences, Meerut", "IIMT College of Pharmacy, Greater Noida", "IIMT Engineering College, Meerut", "IKP Knowledge Park Erstwhile ICICI Knowledge Park", "Iliria College", "Illinois Institute of Technology", "Illinois State University", "Imhotep Institute Charter High School", "Immaculata University", "Impact College of Engineering and Applied Science", "Imperial College London", "IMS Engineering College", "Inderprastha Engineering College (IPEC)", "Indian Hills Community College", "Indian Institute of Engineering Science and Technology (IIEST), Shibpur", "Indian Institute of Information Technology Design & Manufacturing, Jabalpur", "Indian Institute of Information Technology, Allahabad", "Indian Institute of Information Technology, Kalyani", "Indian Institute of Information Technology, Kottayam", "Indian Institute of Information Technology, Pune", "Indian Institute of Information Technology, Sri City", "Indian Institute of Information Technology, Una", "Indian Institute of Information Technology, Vadodara", "Indian Institute of Space Science and Technology (IIST)", "Indian Institute of Technology (ISM), Dhanbad", "Indian Institute of Technology, BHU", "Indian Institute of Technology, Bhubaneswar", "Indian Institute of Technology, Bombay", "Indian Institute of Technology, Gandhinagar", "Indian Institute of Technology, Guwahati", "Indian Institute of Technology, Gwalior", "Indian Institute of Technology, Hyderabad", "Indian Institute of Technology, Jabalpur", "Indian Institute of Technology, Jodhpur", "Indian Institute of Technology, Kanpur", "Indian Institute of Technology, Kharagpur", "Indian Institute of Technology, Kota", "Indian Institute of Technology, Madras", "Indian Institute of Technology, Patna", "Indian Institute of Technology, Roorkee", "Indian Institute of Technology, Ropar", "Indiana State University", "Indiana University", "Indiana University of Pennsylvania", "Indiana University-Purdue University Fort Wayne", "Indiana Universityâ€“Purdue University Indianapolis", "Indira Gandhi Delhi Technical University for Women", "Indira Gandhi Engineering College, Sagar", "Indira Gandhi Institute of Technology, Sarang", "Indira Gandhi National Open University", "Indraprastha Institute of Information Technology", "Indus University, Ahmedabad", "Insight PA Cyber Charter School", "Institut polytechnique de Bordeaux (INP)", "Institute for Auto Parts and Hand Tools Technology", "Institute of Aeronautical Engineering (IARE), Hyderabad", "Institute of Engineering & Management (IEM)", "Institute of Engineering and Rural Technology Allahabad", "Institute of Engineering and Technology, DAVV", "Institute of Infrastructure Technology Research and Management, Ahmedabad", "Institute of Technical Education and Research (ITER), Bhubaneswar", "Institute of Technology, Banaras Hindu University", "Institute Of Technology, Nirma University", "Instituto PolitÃ©cnico Nacional", "Instituto Tecnologico Superior de San Martin Texmelucan", "Instituto TecnolÃ³gico AutÃ³nomo de MÃ©xico (ITAM)", "Instituto TecnolÃ³gico Superior de Cintalapa", "Instituto TecnolÃ³gico Superior de El Mante", "Instituto TecnolÃ³gico Superior de los RÃ­os", "Instituto TecnolÃ³gico y de Estudios Superiores de Monterrey (ITESM)", "Instituto TecnolÃ³gico y de Estudios Superiores de Monterrey (ITESM) Campus Aguascalientes", "Instituto TecnolÃ³gico y de Estudios Superiores de Monterrey (ITESM) Campus Chiapas", "Instituto TecnolÃ³gico y de Estudios Superiores de Monterrey (ITESM) Campus Chihuahua", "Instituto TecnolÃ³gico y de Estudios Superiores de Monterrey (ITESM) Campus Ciudad de Mexico", "Instituto TecnolÃ³gico y de Estudios Superiores de Monterrey (ITESM) Campus Ciudad JuÃ¡rez", "Instituto TecnolÃ³gico y de Estudios Superiores de Monterrey (ITESM) Campus Cuernavaca", "Instituto TecnolÃ³gico y de Estudios Superiores de Monterrey (ITESM) Campus Cumbres", "Instituto TecnolÃ³gico y de Estudios Superiores de Monterrey (ITESM) Campus Eugenio Garza LagÃ¼era", "Instituto TecnolÃ³gico y de Estudios Superiores de Monterrey (ITESM) Campus Eugenio Garza Sada", "Instituto TecnolÃ³gico y de Estudios Superiores de Monterrey (ITESM) Campus Guadalajara", "Instituto TecnolÃ³gico y de Estudios Superiores de Monterrey (ITESM) Campus Hidalgo", "Instituto TecnolÃ³gico y de Estudios Superiores de Monterrey (ITESM) Campus Irapuato", "Instituto TecnolÃ³gico y de Estudios Superiores de Monterrey (ITESM) Campus Laguna", "Instituto TecnolÃ³gico y de Estudios Superiores de Monterrey (ITESM) Campus LeÃ³n", "Instituto TecnolÃ³gico y de Estudios Superiores de Monterrey (ITESM) Campus Morelia", "Instituto TecnolÃ³gico y de Estudios Superiores de Monterrey (ITESM) Campus ObregÃ³n", "Instituto TecnolÃ³gico y de Estudios Superiores de Monterrey (ITESM) Campus Puebla", "Instituto TecnolÃ³gico y de Estudios Superiores de Monterrey (ITESM) Campus QuerÃ©taro", "Instituto TecnolÃ³gico y de Estudios Superiores de Monterrey (ITESM) Campus Saltillo", "Instituto TecnolÃ³gico y de Estudios Superiores de Monterrey (ITESM) Campus San Luis PotosÃ­", "Instituto TecnolÃ³gico y de Estudios Superiores de Monterrey (ITESM) Campus Santa Catarina", "Instituto TecnolÃ³gico y de Estudios Superiores de Monterrey (ITESM) Campus Santa Fe", "Instituto TecnolÃ³gico y de Estudios Superiores de Monterrey (ITESM) Campus Sinaloa", "Instituto TecnolÃ³gico y de Estudios Superiores de Monterrey (ITESM) Campus Sonora", "Instituto TecnolÃ³gico y de Estudios Superiores de Monterrey (ITESM) Campus Tampico", "Instituto TecnolÃ³gico y de Estudios Superiores de Monterrey (ITESM) Campus Toluca", "Instituto TecnolÃ³gico y de Estudios Superiores de Monterrey (ITESM) Campus Valle Alto", "Instituto TecnolÃ³gico y de Estudios Superiores de Monterrey (ITESM) Campus Veracruz", "Instituto TecnolÃ³gico y de Estudios Superiores de Monterrey (ITESM) Campus Zacatecas", "Instituto TecnolÃ³gico y de Estudios Superiores de Occidente (ITESO)", "Instituto TecnÃ³logico de La Laguna (ITL)", "Instytut PamiÄ™ci Narodowej", "International Institute of Information Technology,  Hyderabad", "International Institute of Information Technology, Bangalore", "International Institute Of Information Technology, Naya Raipur", "International Leadership Charter High School", "International School of Choueifat", "Iowa Central Community College", "Iowa State University", "Iowa Western Community College", "Islamic University of Science and Technology, Pulwama", "Istanbul University", "IT University of Copenhagen", "Ithaca College", "ITM University, Gwalior", "ITM University, Vadodara", "ITMO University", "J.C. Bose University of Science and Technology, YMCA", "J.N.N College of Engineering", "Jabalpur Engineering College", "Jackson Memorial High School", "Jackson State University", "Jacobs University Bremen", "Jadavpur University", "Jagiellonian University", "Jai Narain Vyas University", "Jaipur Engineering College & Research Centre (JECRC)", "Jaipur National University", "Jalpaiguri Government Engineering College", "James Gillespie's High School", "James Madison High School", "James Madison University", "Jamia Hamdard", "Jamia Millia Islamia - JMI,  Jamia Nagar", "Jawaharlal Nehru Government Engineering College (JNGEC)", "Jawaharlal Nehru Technological University", "Jaypee Institute of Technology,  Noida", "Jaypee University of Engineering and Technology", "Jerusalem College of Engineering", "JK Institute of Applied Physics and Technology", "JK Lakshmipat University (JKLU)", "Jnanavikas Institute of Technology", "JNTUA College of Engineering,  Pulivendula", "JNTUH College of Engineering, HYDERABAD", "JNTUK University College of Engineering, Vizianagaram", "Jodhpur Institute of Engineering and Technology (JIET)", "John A. Ferguson Senior High School", "John Abbott College", "John Bartram High School", "John F. Kennedy Memorial High School", "John Jay College of Criminal Justice, CUNY", "John Leggott College", "John P. Stevens High School", "Johns Hopkins University", "Johnson & Wales University", "Johnson C. Smith University", "Jorhat Engineering College", "Jorhat Institute of Science and Technology", "JSS Academy of Technical Education", "Jules E. Mastbaum Technical High School", "Julia R. Masterman School", "Jyothy Institute of Technology", "K S School of Engineering and Management", "K. J. Somaiya College of Engineering", "K. S Institute of Technology (KSIT), Bengaluru", "K.L. College of Engineering", "K.L.S Gogte Institute of Technology", "K.M.E.A Engineering College", "K.S Rangasamy College Of Technology", "K.S. School of Business Management", "Kamla Nehru Institute of Technology", "Kansai University", "Kansas State University", "Kantipur Engineering College", "Karlsruhe Institute of Technology", "Karmaveer Bhaurao Patil College of Engineering", "Karpagam College of Engineering (KCE)", "Karunya Institute of Technology and Sciences", "Kashi Institute of Technology", "Kathmandu BernHardt College", "Kaunas University of Technology", "KCG College of Engineering", "Kean University", "Keele University", "Kendriya Vidyalaya, AFS, Begumpet", "Kennesaw State University", "Kennett High School", "Kensington High School Complex", "Kent State University", "Kent State University at Stark", "Keshav Memorial Institute of Technology,  Hyderabad", "Khan Lab School", "King Edward VI Five Ways School", "King's College London", "Kingsborough Community College, CUNY", "Kingsway Regional High School", "KIPP DuBois Charter School", "Kitchener-Waterloo Collegiate & Vocational School", "KJ's Educational Institutes,  Pune", "KLE Dr. M.S. Sheshgiri College of Engineering and Technology", "KLN College of Engineering", "KLS Gogte Institute of Technology", "Knox College", "KNSIT", "Konark Institute of Science and Technology", "Kongu Engineering College", "Koustuv Group Of Institutions (KISD & COEB)", "KrakÃ³w University of Economics", "Krishi Vigyan Kendra, Durgapur", "Krishna Engineering College", "Kristu Jayanti College", "Kshatriya College of Engineering", "KTH Royal Institute of Technology", "Kumaraguru College Of Technology", "Kutztown University of Pennsylvania", "L D College Of Engineering Library", "L. D. College of Engineering", "La Roche College", "La Salle University - Philadelphia", "La Sierra University", "Lady Doak College", "Lafayette College", "LaGuardia Community College, CUNY", "Lake Braddock Secondary School", "Lakeside High School", "Lakshmi Narayan College of Technology (LNCT)", "Lampeter-Strasburg High School", "Lancaster University", "Lankenau High School", "Laval University", "Lawrence Technological University", "Lawrence University", "LBS Institute of Technology for Women (LBSITW)", "Lehigh University", "Lehman College, CUNY", "Leiden University", "Lewis & Clark College", "Lewis University", "Lexington High School", "LICET", "Lick Wilmerding High School", "LIM College", "Lincoln Christian University", "Lincoln Technical Institute - Center City Philadelphia", "Lincoln Technical Institute - Northeast Philadelphia", "Lincoln University", "Lindenwood University", "Linn-Mar High School", "Lisgar Collegiate Institute", "Little Flowers Public Sr Secondary School", "Livingston High School", "Loch Raven High School", "Lodz University of Technology", "Loknayak Jai Prakash Institute of Technology,  Chhapra", "London Metropolitan University", "London School of Economics and Political Science", "Lone Star College System", "Lord Krishna College of Engineering", "Lords Institute of Engineering & Technology", "Los Altos High School", "Loughborough University", "Louisiana State University", "Lovely Professional University", "Lowell High School", "Loyola Marymount University", "LuleÃ¥ University of Technology, LTU", "Luther College", "Lyallpur Khalsa College of Engineering, Jalandhar", "Lynbrook High School", "M.J.P. Rohilkhand University", "M.S. Ramaiah School of Advance Studies", "M.V.Jayaraman College of Engineering", "Macalester College", "MacArthur High School", "Macaulay Honors College, CUNY", "MacEwan University", "Macomb Community College", "Madan Mohan Malaviya University of Technology, Gorakhpur", "Madhav Institute of Technology & Science (MITS)", "Madison College", "Madison West High School", "Madras Institute Of Technology", "Maggie L. Walker Governor's School", "Mahakal Institute Of Technology", "Maharaj Vijayaram Gajapathi Raj College of Engineering (MVGRCE)", "Maharaja Agrasen Institute of Technology", "Maharaja Surajmal Institute of Technology", "Maharashtra Institute of Technology, Pune", "Mahatma Gandhi Institute for Rural Industrialization (MGIRI)", "Mahatma Gandhi Institute of Technology (MGIT)", "Mahendra Engineering College", "Mailam Engineering College", "Maine South High School", "Maitreyi College, University of Delhi", "Majhighariani Institute Of technology & Science (MITS)", "Malaviya National Institute of Technology Jaipur", "Malineni Lakshmaiah Women's Engineering College", "Malla Reddy College of Engineering Technology", "Malla Reddy Engineering College (MREC)", "Malla Reddy Institute Of Engineering And Technology (MRIET)", "Malnad College of Engineering", "Malvern Preparatory School", "Manakula Vinayagar Institute of Techology", "Manalapan High School", "Manav Rachna International", "Manchester Metropolitan University", "Manhattan College", "Manhattan High School", "Manipal Institute of Technology", "Manipal University", "Manipal University, Jaipur", "Manor College", "Mar Athanasius College of Engineering", "Marc Garneau Collegiate Institute", "Marcellus High School", "Mariana Bracetti Academy Charter School", "Marianopolis College", "Marist College", "Maritime Academy Charter School (MACHS)", "Markham District High School", "Markville Secondary School", "Marlboro High School", "Marquette University", "Marshall High School", "Martin Luther King High School", "Marymount University", "Masaryk University", "Massachusetts Institute of Technology", "Mastery Charter School - Hardy Williams Academy", "Mastery Charter School - Thomas Campus", "Mastery Charter School at Lenfest Campus", "Mastery Charter School at Pickett Campus", "Mastery Charter School at Shoemaker Campus", "Mata Gujri College", "Mater Academy High School", "Math, Civics and Sciences Charter School - Philadelphia", "Mathematics, Science, and Technology Community Charter School (MaST)", "Matrusri Engineering College,  Hyderabad", "Maulana Abul Kalam Azad University of Technology", "Maulana Azad National Institute of Technology", "Maulana Azad National Institute of Technology Bhopal", "Maumee Valley Country Day School", "MBM Engineering College, Jodhpur", "McGill University", "McMaster University", "Medgar Evers College, CUNY", "Medical University of Silesia", "Meerut Institute of Engineering and Technology (MIET)", "Menlo School", "Mepco Schlenk Engineering College", "Merced College", "Mercer County Community College", "Mercer University", "Meredith College", "Messiah College", "Metas Adventist School", "Metropolia University of Applied Sciences", "Metropolitan State University", "Metuchen High School", "Mewar University Chittorgarh", "Miami Dade College", "Miami Lakes Educational Center", "Miami University", "Michigan State University", "Michigan Technological University", "Microsoft School of the Future High School", "Middle Tennessee State University", "Middlebury College", "Middlesex County Academy", "Middlesex County Academy For Allied Health And Biomedical Sciences", "Middlesex County Academy for Science, Mathematics & Engineering Technologies", "Middlesex County College", "Middlesex University", "Middleton High School", "Middletown High School South", "Midwood", "Miles College", "Millburn High School", "Millburn Middle School", "Millville Senior High School", "Milwaukee School of Engineering", "Minerva University", "Minnesota State University, Mankato", "Misrimal Navajee Munoth Jain Engineering College", "Mission College Boulevard", "Mission San Jose High School", "Mississippi State University", "Mississippi University for Women", "Missouri State University", "Missouri University of Science and Technology", "Model Institute of Engineering and Technology (MIET)", "Modern Engineering and Management Studies", "Mody University", "Mohammed V University", "Molloy College", "Monmouth College", "Monmouth University", "Monroe Community College", "Monroe Township High School", "Monta Vista High School", "Montana State University", "Montclair High School", "Montclair State University", "Montgomery Blair High School", "Montgomery College", "Montgomery County Community College - Central Campus (Blue Bell)", "Montgomery County Community College - West Campus (Pottstown)", "Montgomery High School", "Montville Township High School", "Moore College of Art and Design", "Moore Middle School", "Moorestown High School", "Moraine Valley Community College", "Morehouse College", "Morgan State University", "Morris County School of Technology", "Morris Hills High School", "Morton College", "Moscow Institute of Physics and Technology", "Moscrop Secondary School", "Motilal Nehru National Institute of Technology Allahabad", "Motivation High School (formerly John Bartram High School)", "Mount Holyoke College", "Mountain Lakes High School", "Mountain View High School", "MSME TDC PPDC Agra", "Mt. San Antonio College", "Muhlenberg college", "Multi-Cultural Academy Charter School", "Murrell Dobbins Technical High School", "Muthoot Institute of Technology & Science", "Muzaffarpur Institute of Technology", "MVJ College of Engineering", "Nagaland University, Dimapur Campus", "Nalla Malla Reddy Engineering College, Ghatkesar", "Nanyang Technological University", "Narsee Monjee College of Commerce and Economics", "Narsihma Reddy Engineering College", "Nashua High School South", "National Engineering College", "National Institute of Engineering, Mysore", "National Institute of Science and Technology, Odisha", "National Institute of Technology, Agartala", "National Institute of Technology, Calicut", "National Institute of Technology, Delhi", "National Institute of Technology, Durgapur", "National Institute of Technology, Goa", "National Institute of Technology, Hamirpur", "National Institute of Technology, Jamshedpur", "National Institute of Technology, Karnataka", "National Institute of Technology, Kurukshetra", "National Institute of Technology, Patna", "National Institute of Technology, Raipur", "National Institute of Technology, Rourkela", "National Institute of Technology, Silchar", "National Institute of Technology, Srinagar", "National Institute of Technology, Surat", "National Institute of Technology, Tiruchirappalli", "National Institute of Technology, Trichy", "National Institute of Technology, Uttarakhand", "National Institute of Technology, Warangal", "National Research University Higher School Of Economics", "National University of Singapore", "Neotia Institute Of Technology Management and Science (NITMAS)", "Netaji Subhas Institute of Technology", "Netaji Subhash Engineering College", "Neumann University", "New Albany High School", "New Foundations Charter School - Philadelphia", "New Horizon College of Engineering", "New Jersey City University", "New Jersey Institute of Technology", "New Providence High School", "New River Community College", "New York City College of Technology, CUNY", "New York Institute of Technology", "New York University", "New York University Abu Dhabi", "Newark Charter High School", "Newark Charter Junior/Senior High School", "Newcastle University", "Newton South High School", "Niagara College", "NIFT-TEA College of Knitwear Fashion", "NIIT University", "Nipissing University", "Nirma University", "NITK Science & Technology Entrepreneurs' Park (NITK-STEP)", "Nitte Meenakshi Institute of Technology", "Nizam College of Engineering Technology", "NMAM Institute of Technology", "Noakhali Science and Technology University", "Noida Institute of Engineering and Technology", "Noor-ul-Iman", "Norco College", "Norfolk State University", "North American University", "North Andover High School", "North Brunswick Township High School", "North Carolina Agricultural and Technical (A&T) State University", "North Carolina Central University", "North Carolina School of Science and Mathematics", "North Carolina State University", "North Dakota State University", "North Hunterdon High School", "North Park Secondary School", "North Penn High School", "North Shore Community College", "Northeast High School - Philadelphia", "Northeastern University", "Northern Alberta Institute of Technology (NAIT)", "Northern Arizona University", "Northern Illinois University", "Northern Kentucky University", "Northern Michigan University", "Northern Secondary School", "Northern Virginia Community College", "Northumbria University", "Northview High School", "Northwest Missouri State University", "Northwest Parkway High School", "Northwest Vista College", "Northwestern Oklahoma State University", "Northwestern University", "Northwood Academy/Arts School", "Nottingham Trent University", "Novi High School", "NRI Institute of information Science and Technology (NIIST)", "NSS College of Engineering", "Oakland Community College", "Oakland University", "Obafemi Awolowo University Ile-Ife", "Oberlin College", "Ocean City High School", "Ocean County College", "Oglethorpe University", "Ohio Christian University", "Ohio University", "Okemos High School", "Oklahoma State University", "Old Dominion University", "Old Westbury, SUNY", "Olney High School", "Onalaska High School", "Onondaga Community College", "Ontario Tech University", "Opolska University of Technology", "Oratary Prep School At Summit", "Oregon State University", "Oriental Group of Institutes", "Orissa Engineering College", "Orleans Technical Institute", "Osbourn Park High School", "Ostbayerische Technische Hochschule Regensburg", "Otterbein University", "Overbrook High School - Philadelphia", "Oxford Academy High School", "Oxford Brookes University", "P.D.A. College of Engineering", "Pace University", "Pacific University,  Udaipur", "Palo Alto High School", "Palomar College", "Pandit Deendayal Petroleum University", "Panjab University,  SSG Regional Centre", "Parala Maharaja Engineering College,  Berhampur", "Paramount International School", "Park College of Engineering and Technology", "Parkview High School", "Parkway Center City High School", "Parkway West High School", "Parsippany High School", "Parsons School of Design", "Parul Institute of Engineering & Technology", "Pasadena City College", "Pascal English School, Cyprus", "Pathways School Noida", "Patriot High School - Nokesville", "Patriot High School - Riverside", "Paul Robeson High School (formerly John Bartram High School)", "PDM College of Engineering", "Peirce College", "Penn State Erie, The Behrend College", "Penncrest High School", "Pennington School", "Pennsylvania Academy of the Fine Arts", "Pennsylvania Cyber Charter School", "Pennsylvania Distance Learning Charter School - Online", "Pennsylvania Institute of Technology - Center City Philadelphia", "Pennsylvania Institute of Technology - Media", "Pennsylvania Leadership Charter School - Online", "Pennsylvania Virtual Charter School", "Periyar Maniammai Institute of Science & Technology (PMU)", "Perth Amboy High School", "Perth Amboy Vocational Technical School", "PES College of Engineering, Mandya", "PES University", "PESIT, Bangalore South Campus", "PGP College of Engineering Technology", "Philadelphia Academy Charter School", "Philadelphia Electrical and Technology Charter School", "Philadelphia High School for Girls", "Philadelphia Performing Arts Charter School (String Theory High School) - Vine Street Campus", "Piedmont High School", "Pierre Elliott Trudeau High School", "Pima Community College", "Pingree School", "Piscataway Township High School", "Pittsburgh Technical College - Philadelphia", "Pittsburgh Technical Institute", "Plaksha University", "Plano East Senior High School", "Plovdiv Medical University", "Point Pleasant Beach High School", "Pokhara University", "Politecnico di Milano", "Polsko-JapoÅ„ska Akademia Technik Komputerowych", "Pomona College", "Pondicherry Engineering College", "Poolesville High School", "Poornima College of Engineering", "Poornima Group of Institutions", "Poornima Institute Of Engineering And Technology", "Pope John Paul II High School", "Port Credit Secondary School", "Porter-Gaud School", "Portland State University", "Potomac Senior High School", "Potsdam, SUNY", "PoznaÅ„ University of Technology", "Pranveer Singh Institute of Technology", "Prathyusha Engineering College", "Presidency School, Surat.", "Preston High School", "Preston University", "Princeton Day School", "Princeton High School", "Princeton International School Of Mathematics And Science", "Princeton University", "Priyadarshini College Of Engineering (PEC),  Nagpur", "Proudhadevaraya Institute Of Technology", "PSG College of Technology,  Coimbatore", "PSG-Science & Technology Entrepreneurial Park (PSG-STEP)", "Pune Institute of Computer Technology", "Punjab Engineering College (PEC)", "Punjab Institute of Management & Technology", "Punjab Institute Of Medical Sciences (PIMS)", "Punjab Institute of Technology, Rajpura", "Punjab University, Patiala", "Purdue University", "Queen Mary University of London", "Queen's University", "Queens College, CUNY", "Queensborough Community College, CUNY", "R N S Institute of Technology (RNSIT)", "R. R. Institute of Technology", "R.L.Jalappa Institute of technology", "R.V. College Of Engineering", "R.V. College of Engineering (RVCE)", "R.V.R. & J.C. College of Engineering", "Radharaman Institute of Research Technology (RIRT), Radharaman Group", "Radharaman Institute of Technology & Science (RITS), Bhopal", "Radnor High School", "Raj Kumar Goel Engineering College", "Rajagiri School of Engineering and Technology", "Rajarajeswari College of Engineering (RRCE)", "Rajasthan Institute Of Engineering and Technology", "Rajdhani College of Engineering & Management", "Rajendra Mane College of Engineering and Technology (RMCET)", "Rajiv Gandhi College of Engineering and Technology", "Rajiv Gandhi Institute of Technology (RIT), Kottayam", "Rajiv Gandhi University of Knowledge Technologies (RGUKT), Basar", "Rajkiya Engineering College, Ambedkar Nagar", "Raksha Shakti University", "RAM-EESH INSTITUTE OF ENGINEERING TECHNOLOGY", "Ramaiah Institute of Technology", "Ramapo College of New Jersey", "Ramapo High School", "Ramrao Adik Institute of Technology (RAIT), DY Patil University", "Randolph-Macon College", "Rani Laxmi Bai Public School", "Raritan High School", "Raritan Valley Community College", "Rasmussen University", "Ravenscroft School", "Ravenwood High School", "Reach Cyber Charter School", "Red Bank Regional High School", "Reed College", "Regional College For Education Research and Technology, Jaipur", "Regis High School", "Rensselaer Polytechnic Institute", "REVA University", "Rheinisch-WestfÃ¤lische Technische Hochschule Aachen (RWTH)", "Rhode Island College", "Rhode Island School of Design", "Rhodes College", "Rice University", "Richard Montgomery High School", "Richard Stockton University", "Richardson High School", "Richland College", "Richmond Hill High School", "Rider University", "Ridge High School", "Ridgewood High School", "Riga Technical University", "RIMT Institute of Engineering and Technology", "River Dell High School", "RMK College of Engineering", "RNS Institute of Technology", "Robbinsville High School", "Robert Gordon University", "Rochester Institute of Technology", "Rock Ridge High School", "Roger Williams University", "Rollins College", "Roosevelt High School", "Rosa Parks Middle School", "Rose-Hulman Institute of Technology", "Rosemont College", "Rowan College at Burlington County - Mount Holly", "Rowan College at Burlington County - Pemberton", "Rowan College at Burlington County - Willingboro", "Rowan College at Gloucester County - Mount Laurel", "Rowan University", "Roxborough High School", "Roxbury High School", "Royal Holloway, University of London", "RPIIT Technical Campus", "Rudbecksgymnasiet", "Rungta College of Engineering and Technology, Bhilai", "Rustamji Institute of Technology", "Rutgers Preparatory School", "Rutgers University - Newark", "Rutgers University â€“ Camden", "Rutgers, The State University of New Jersey", "Ryde School", "Rye High School", "Ryerson University", "S A Engineering College", "S G Balekundri Institute of Technology", "Sachdeva Institute of Technology", "Sagar Institute of Science & Technology (SISTec)", "Saginaw Valley State University", "Sahrdaya College of Engineering and Technology", "Sai Vidya Institute of Technology", "Saint Joseph High School", "Saint Joseph's College of Maine", "Saint Joseph's Preparatory School - Philadelphia", "Saint Joseph's University - Philadelphia", "Saint Paul College", "Saint Peter's Preparatory School", "Saint Peter's University", "SAL Engineering and Technical Institute", "Salem Community College", "Salem State University", "Sambalpur University Institute of Information Technology (SUIIT)", "Sambhram Institute of Technology", "Samrat Ashok Technological Institute (S.A.I.T)", "Samuel Fels High School - Philadelphia", "San Diego State University", "San Francisco State University", "San Jose State University", "San Marcos High School", "San Marin High School", "San Mateo High School", "Sankofa Freedom Academy Charter School", "Sant Longowal Institute of Engineering and Technology", "Santa Barbara City College", "Santa Clara University", "Santa Margarita Catholic High School", "Santa Rosa Junior College", "Sapthagiri College of Engineering", "Saratoga High School", "Sardar Patel Institute Of Technology", "Sardar Patel University", "Sardar Vallabhbhai National Institute of Technology, Surat", "Sardar Vallabhbhai Patel Institute of Technology, Vasad", "Sarvajanik College of Engineering & Technology", "SASTRA University", "Saurashtra University Rajkot", "Savannah State University", "Savitribai Phule Pune University", "School of Engineering and Technology, Mizoram University", "School of Engineering, Cochin University of Science and Technology", "School of Professional Studies, CUNY", "School of Visual Arts, New York", "Science and Technology Entrepreneurs Park (STEP), Harcourt", "Science and TechnologyEntrepreneurs Park, Indian Institute of Technology", "Science Leadership Academy", "Scranton High School", "Seneca College", "Seton Hall University", "Seven Lakes High School", "Seventh Day Adventist High School", "Shaker High School", "Shankersinh Vaghela Bapu Institute of Technology", "Sharda University", "Sheffield Hallam University", "Shelton High School", "Sheridan College", "Sherwood Convent School", "Sherwood High School", "Shiv Nadar University", "Shri Dharmasthala Manjunatheshwara College of Engineering and Technology (SDM)", "Shri Govindram Seksaria Institute of Technology and Science", "Shri Guru Gobind Singhji Institute of Engineering and Technology (SGGS)", "Shri Guru Ram Rai Public School", "Shri Mata Vaishno Devi University(SMVDU)", "Shri Ramswaroop College Of Engineering and Management", "Shri Ramswaroop Memorial Group of Professional Colleges (SRMGPC)", "Shri Sant Gajanan Maharaj College of Engineering, Shegaon (SSGMCE)", "Shri Shankaracharya Technical Campus", "Shri Vaishnav Institute of Technology and Science", "Shri Venkateshwara College of Engineering", "Shridevi Institute of Engineering & Technology", "Shriram Institute for Industrial Research", "Siddaganga Institute Of Technology, Tumakuru", "Siena College", "Sikkim Manipal Institute of Technology", "Silesian University of Technology", "Silicon Institute of Technology", "Siliguri Institute of Technology", "Silver Oak College of Engineering & Technology", "Simmons College", "Simon Fraser University", "Simon Gratz High School", "Simpson College", "Simsbury High School", "SimÃ³n BolÃ­var University", "Sinclair Community College", "Singapore University of Technology and Design", "Sinhgad Institute of Technology", "Sir John A. Macdonald Secondary School", "Sir M Visvesvaraya Institute of Technology (Sir MVIT)", "Sir Padampat Singhania University", "Sitarambhai Naranji Patel Institute of Technology & Research Centre", "SJB Institute of Technology", "Skidmore College", "SKR Engineering College", "Slippery Rock University of Pennsylvania", "Slovak University of Technology in Bratislava (STU)", "Smith College", "SOAS University of London", "Society for Development of Composites", "Solebury School", "Sona College of Technology", "Souderton Area High School", "South Brunswick High School", "South Carolina State University", "South Dakota School of Mines and Technology", "South Hills School of Business & Technology", "South Lakes High School", "South Philadelphia High School", "South Texas College", "Southeastern Louisiana University", "Southern Connecticut State University", "Southern Illinois University Carbondale", "Southern Illinois University Edwardsville", "Southern Methodist University", "Southern Oregon University", "Southern University and A&M College", "Southern Utah University", "Southwestern College", "Spelman College", "Spotswood High School", "Spring Arbor University", "Springside Chestnut Hill Academy", "Sree Chitra Thirunal College of Engineering", "Sreenidhi Institute of Science & Technology", "Sri Jayachamarajendra College of Engineering", "Sri Krishna College of Engineering and Technology (SKCET)", "Sri Krishna College of Technology, Coimbatore", "Sri Lanka Institute of Information Technology (SLIIT)", "Sri Manakula Vinayagar Engineering", "Sri Ramakrishna Engineering College (SREC)", "Sri Revana Siddeshwara Institute of Technology", "Sri Siddhartha Institute of Technology", "Sri Sivasubramaniya Nadar College of Engineering", "Sri Venkateshwara College of Engineering", "Sri Vishnu Educational Society", "Srinivas Institute of Technology (SIT)", "SRM Easwari Engineering College, Chennai", "SRM University", "SRM University, Sonepat", "SS College of Engineering", "St Brendan High School", "St Edwards University", "St Joseph Engineering College", "St Mary's Catholic High School â€“ Croydon", "St Mary's CE High School â€“ Cheshunt", "St Paul's Catholic College â€“ Sunbury-on-Thames", "St. Charles Borromeo Seminary", "St. Cloud State University", "St. David Catholic Secondary School", "St. John's University, New York", "St. Joseph's College of Engineering and Technology, Palai", "St. Mark's School, Hong Kong", "St. Mary's Convent School", "St. Mary's Ryken High School", "St. Michael College of Engineering & Technology", "St. Peter's Institute of Higher Education and Research", "St. Pious X Degree & PG College for women", "St. Raymond High School for Boys And Girls", "St. Theresa of Lisieux Catholic High School", "St. Xavier's Senior Secondary School, Jaipur", "St.Martin's Engineering College", "Stanford University", "Stanley College of Engineering and Technology for Women", "Star Technical Institute", "Startup Incubation and Innovation Centre, IIT Kanpur", "Staten Island Technical High School", "Steinert High School", "Stephen F. Austin State University", "Stetson University", "Stevens Institute of Technology", "Stevenson University", "Stockholm University", "Stockton University", "Stonehill College", "Stonewall Jackson High School - Manassas", "Stonewall Jackson High School - Quicksburg", "Stony Brook University, SUNY", "Strawberry Mansion High School", "Strayer University - Bensalem", "Strayer University - Philadelphia Center City", "Stuyvesant High School", "Sulphur High School", "SUNY Polytechnic Institute", "SUPINFO International University", "Susq-Cyber Charter School", "Susquehanna University", "Sussex County Community College", "Suyash Institute of Information Technology", "SVS College of Engineering", "Swami Keshvanand Institute of Technology,  Management & Gramothan (SKIT)", "Swansea University", "Swarthmore College", "Syed Ammal Engineering College", "Symbiosis International University", "Synergy Institute of Engineering and Technology", "Syracuse University", "T K M College of Engineering", "Tacoma Community College", "Tacony Academy Charter School", "Tadeusz KoÅ›ciuszko University of Technology", "Tallinn University", "Tallinn University of Technology", "Talmudical Yeshiva of Philadelphia", "Tamil Nadu Agricultural University (TNAU)", "Tamilnadu College of Engineering", "Tampere University of Applied Sciences", "Tampere University of Technology", "Tarleton State University", "TECH Freire Charter High School", "Technische UniversitÃ¤t MÃ¼nchen", "Techno India College of Technology", "Techno India University", "TecnolÃ³gico de Estudio Superiores de Ixtapaluca", "TecnolÃ³gico de Estudios Superiores de Ecatepec", "TecnolÃ³gico de Estudios Superiores de Jilotepec", "Teesside University", "Temple University", "Temple University - Ambler", "Temple University - Harrisburg", "Temple University - Health Sciences Campus", "Temple University - Rome", "Temple University - Tokyo", "Tenafly High School", "Tennessee State University", "Texas A&M University", "Texas A&M University â€“ Central Texas", "Texas A&M University â€“ Corpus Christi", "Texas A&M University â€“ Kingsville", "Texas Christian University", "Texas Southern University", "Texas Southmost College", "Texas State University", "Texas Tech University", "Tezpur University", "Thadomal Shahani Engineering College", "Thakur College of Engineering and Technology", "Thanthai Periyar Government Institute of Technology", "Thapar Institute of Engineering and Technology", "THDC Institute of Hydropower Engineering and Technology, Tehri", "The Arts Academy at Benjamin Rush", "The British University In Egypt", "The Bronx High School of Science", "The City College of New York, CUNY", "The College at Brockport, SUNY", "The College of New Jersey", "The College of Saint Rose", "The Curtis Institute of Music", "The Federal University of Technology,  Akure", "The George Washington University", "The Governor's School @ Innovation Park", "The Harker School", "The Hill School", "The Katholieke Universiteit Leuven", "The Lawrenceville School", "The LNM Institute of Information Technology", "The Maharaja Sayajirao University of Baroda", "The Mount Tabor Training College", "The Ohio State University", "The Open University", "The Oxford College of Engineering", "The Pennsylvania State University", "The Pennsylvania State University â€“ Abington Campus", "The Pennsylvania State University â€“ Berks", "The Pennsylvania State University â€“ Brandywine", "The Pennsylvania State University â€“ Harrisburg", "The Pennsylvania State University â€“ York Campus", "The Roxbury Latin School", "The Savannah College of Art and Design", "The SRM University", "The Technical University of Denmark", "The Technische UniversitÃ¤t Berlin", "The University of Aberdeen", "The University of Akron", "The University of Alabama", "The University of Alabama at Birmingham", "The University of Alberta", "The University of Applied Sciences Upper Austria", "The University of Arizona", "The University of Arkansas", "The University of Bath", "The University of Bedfordshire", "The University of Birmingham", "The University of Bolton", "The University of Bonn", "The University of Bristol", "The University of British Columbia", "The University of Calgary", "The University of Calicut", "The University of California, Berkeley", "The University of California, Davis", "The University of California, Irvine", "The University of California, Los Angeles", "The University of California, Merced", "The University of California, Riverside", "The University of California, San Diego", "The University of California, Santa Barbara", "The University of California, Santa Cruz", "The University of Cambridge", "The University of Central Florida", "The University of Chicago", "The University of Colorado Boulder", "The University of Colorado Colorado Springs", "The University of Connecticut", "The University of Dallas", "The University of Delaware", "The University of Denver", "The University of Derby", "The University of Dundee", "The University of Edinburgh", "The University of Essex", "The University of Evansville", "The University of Exeter", "The University of Falmouth", "The University of Florida", "The University of GdaÅ„sk", "The University of Georgia", "The University of Glasgow", "The University of Groningen", "The University of Guelph", "The University of Houston", "The University of Houston â€“ Clear Lake", "The University of Houston â€“ Downtown", "The University of Huddersfield", "The University of Idaho", "The University of Illinois at Chicago", "The University of Illinois at Urbana-Champaign", "The University of Information Technology and Management in Rzeszow", "The University of Iowa", "The University of Kansas", "The University of Kent", "The University of Kentucky", "The University of La Verne", "The University of Leeds", "The University of Leicester", "The University of Lincoln", "The University of Liverpool", "The University of Ljubljana", "The University of Louisiana at Lafayette", "The University of Louisiana at Monroe", "The University of Louisville", "The University of Manchester", "The University of Manitoba", "The University of Maryland, Baltimore County", "The University of Maryland, College Park", "The University of Massachusetts Amherst", "The University of Massachusetts Boston", "The University of Massachusetts Dartmouth", "The University of Massachusetts Lowell", "The University of Miami", "The University of Michigan", "The University of Michigan-Dearborn", "The University of Michigan-Flint", "The University of Minnesota", "The University of Mississippi", "The University of Missouri", "The University of Missouri-Kansas City", "The University of Missouri-St. Louis", "The University of MÃ¡laga", "The University of Nebraska-Lincoln", "The University of New Brunswick", "The University of New Hampshire", "The University of New Haven", "The University of North Carolina at Chapel Hill", "The University of North Carolina at Charlotte", "The University of North Carolina at Greensboro", "The University of North Texas", "The University of Northampton", "The University of Notre Dame", "The University of Nottingham", "The University of Oklahoma", "The University of Oregon", "The University of Ottawa", "The University of Oulu", "The University of Oxford", "The University of Pennsylvania", "The University of Petroleum and Energy Studies", "The University of Phoenix", "The University of Pittsburgh", "The University of Portland", "The University of Portsmouth", "The University of Puerto Rico, MayagÃ¼ez Campus", "The University of Puerto Rico, RÃ­o Piedras Campus", "The University of Richmond", "The University of Rochester", "The University of Salford", "The University of San Francisco", "The University of Sharjah", "The University of Sheffield", "The University of Silesia in Katowice", "The University of South Carolina", "The University of South Florida", "The University of Southampton", "The University of Southern California", "The University of Southern Denmark", "The University of St Andrews", "The University of St. Gallen", "The University of St. Thomas", "The University of Stirling", "The University of Strathclyde", "The University of Stuttgart", "The University of Surrey", "The University of Sussex", "The University of Tampa", "The University of Tennessee", "The University of Texas at Arlington", "The University of Texas at Austin", "The University of Texas at Dallas", "The University of Texas at El Paso", "The University of Texas at San Antonio", "The University of Texas at Tyler", "The University of Texas of the Permian Basin", "The University of Texas Rio Grande Valley", "The University of Texas â€“ Pan American", "The University of the District of Columbia", "The University of the Pacific", "The University of the South - Sewanee", "The University of the West Indies", "The University of Toledo", "The University of Toronto", "The University of Toronto Mississauga", "The University of Toronto Scarborough", "The University of Tulsa", "The University of Utah", "The University of Vermont", "The University of Victoria", "The University of Virginia", "The University of Warsaw", "The University of Warwick", "The University of Washington", "The University of Washington Bothell", "The University of Waterloo", "The University of West Georgia", "The University of Western Ontario", "The University of Westminster", "The University of Windsor", "The University of Wisconsin-Eau Claire", "The University of Wisconsin-Green Bay", "The University of Wisconsin-La Crosse", "The University of Wisconsin-Madison", "The University of Wisconsin-Milwaukee", "The University of Wisconsin-Oshkosh", "The University of Wisconsin-Parkside", "The University of Wisconsin-Platteville", "The University of Wisconsin-River Falls", "The University of Wisconsin-Stevens Point", "The University of Wisconsin-Stout", "The University of Wisconsin-Superior", "The University of Wisconsin-Whitewater", "The University of Wolverhampton", "The University of WrocÅ‚aw", "The University of York", "The University of Zagreb", "The UniversitÃ© de Sherbrooke", "The Workshop School - Philadelphia", "Thiagarajar College of Engineering (TCE), Madurai", "Thomas A. Edison High School - Philadelphia", "Thomas Edison State College", "Thomas Jefferson High School for Science and Technology", "Thomas Jefferson University - East Falls (formerly Philadelphia University)", "Thomas Jefferson University - Philadelphia Center City", "Thomas Nelson Community College", "Thomas S. Wootton High School", "Thompson Institute - Philadelphia", "Tiruchirappalli Regional Engineering College Science Technology", "Tongji University", "Towson High School", "Towson University", "Trent University", "Trident Academy of Technology", "Trinity College", "Trinity International University", "Trinity Valley School", "Troy Athens High School", "Troy High School", "Troy University", "Truman State University", "Tshwane University of Technology", "TU/e Technische Universiteit Eindhoven University of Technology", "Tufts University", "Tulane University", "Tunis El Manar University", "Turner Fenton Secondary School", "Ulster University", "UNAM FES AragÃ³n", "Union County College", "Union County Magnet High School", "Union County Vocational-Technical Schools", "Union University", "Unionville High School", "United College of Engineering and Research", "United Institute of Technology", "Universidad AutÃ³noma de Baja California (UABC), Tijuana", "Universidad AutÃ³noma de Coahuila", "Universidad AutÃ³noma de Madrid", "Universidad AutÃ³noma de Nuevo LeÃ³n", "Universidad AutÃ³noma de San Luis PotosÃ­", "Universidad AutÃ³noma de Tlaxcala", "Universidad AutÃ³noma del Estado de Morelos", "Universidad AutÃ³noma del Estado de MÃ©xico", "Universidad AutÃ³noma del PerÃº", "Universidad AutÃ³noma Metropolitana", "Universidad Centro de Estudios Cortazar", "Universidad de Guadalajara", "Universidad de Guanajuato", "Universidad de La Laguna", "Universidad de La Salle BajÃ­o", "Universidad de Monterrey", "Universidad del Desarrollo", "Universidad del Valle de MÃ©xico", "Universidad en LÃ­nea, Mexico", "Universidad Iberoamericana", "Universidad Interamericana de Puerto Rico", "Universidad Nacional AutÃ³noma de MÃ©xico", "Universidad Panamericana", "Universidad PolitÃ©cnica de Guanajuato", "Universidad PolitÃ©cnica de QuerÃ©taro", "Universidad TecMilenio", "Universidad TecnolÃ³gica de MÃ©xico", "Universidad TecnolÃ³gica de Puebla", "Universidad TecnolÃ³gica de TorreÃ³n", "Universidad TecnolÃ³gica Nacional", "Universidad Veracruzana", "Universitat AutÃ²noma de Barcelona, UAB", "Universitat de Barcelona", "Universitat Oberta de Catalunya, UOC", "Universitat PolitÃ¨cnica de Catalunya", "Universitat PolitÃ¨cnica de Catalunya, UPC", "Universitat Pompeu Fabra", "Universitatea Politehnica TimiÅŸoara", "University at Albany, SUNY", "University at Binghamton, SUNY", "University at Buffalo, SUNY", "University at New Paltz, SUNY", "University at Oneonta, SUNY", "University at Orange, SUNY", "University at Oswego, SUNY", "University at Plattsburgh, SUNY", "University Campus Suffolk", "University College London", "University College of Engineering and Technology,  Bikaner", "University Institute of Engineering and Technology CSJMU, Kanpur", "University Institute of Information Technology, Shimla", "University Institute of Technology, Burdwan", "University Institute of Technology, RGPV", "University of Basel", "University of BiaÅ‚ystok", "University of Cape Coast, Ghana", "University of Cincinnati", "University of Cincinnati Clermont College", "University of Duisburg-Essen", "University of Gothenburg", "University of Helsinki", "University of Hull", "University of London", "University of Mary Washington", "University of Maryland University College", "University of North America", "University of North Florida", "University of North Georgia", "University of Petroleum and Energy Studies (UPES), Dehradun", "University of Pikeville", "University of Queensland", "University of Regina", "University of Roehampton", "University of Saskatchewan", "University of Science and Technology Houari Boumediene", "University of Southampton", "University of Southern Indiana", "University of Sunderland", "University of Tartu", "University of Technology, Jamaica", "University of the Arts - Philadelphia", "University of the People", "University of the Sciences in Philadelphia", "University of Trento", "University of Udaipur", "University of Valley Forge", "University of Washington Tacoma", "University of West Florida", "University School of Information, Communication and Technology", "University Visvesvaraya College of Engineering (UVCE)", "UniversitÃ¤t Regensburg", "UniversitÃ¤t ZÃ¼rich", "UniversitÃ© de Bordeaux", "UniversitÃ© de Mons", "UniversitÃ© du QuÃ©bec Ã  MontrÃ©al", "Upper Canada College", "Upper Darby High School", "Upper Iowa University", "Upper Moreland High School", "Urbana High School", "Ursinus College", "Utah State University", "Utica College", "Utkal University", "Uttaranchal Institute of Technology", "Vadodara Institute of Engineering", "Valencia College", "Valley Christian High School", "Valley High School", "Vallurupalli Nageswara Rao Vignana Jyothi Institute of Engg. Technology (VNRVJIET)", "Vanderbilt University", "Vanier College", "vardhaman college of engineering", "Vasavi College Of Engineering", "Vassar College", "Veer Narmad South Gujarat University", "Veer Surendra Sai University of Technology", "Veer Surendra Sai University of Technology, Burla", "Vel Tech Multi Tech Dr.Rangarajan Dr.Sakunthala Engineering College", "Vel Tech Rangarajan Dr.Sagunthala R&D Institute of Science and Technology", "Velammal College of Engineering and Technology", "Velammal Institute of Technology", "Vellore Institute of Technology", "Vellore Institute of Technology, Chennai", "Vemana Institute Of Technology", "Veterans Memorial Early College High School", "VIA University College", "Victoria Park Collegiate Institute", "Vidya College of Engineering", "Vidyakunj International School", "Vidyavardhaka College of Engineering", "Vignan Institute of Technology and Science", "Vikas College of Engineering & Technology, Vijayawada", "Villanova University", "Villgro Innovations Foundation IITM Research Park", "Vinayaka Mission's Kirupananda Variyar Engineering College", "Vincennes University", "Vincent Massey Secondary School", "Virginia Commonwealth University", "Virginia State University", "Virginia Tech", "Virginia Union University", "Virginia University of Lynchburg", "Virtual High School @ PWCS", "Vishwakarma Government Engineering College", "Vishwakarma Institute of Technology", "Visvesvaraya National Institute of Technology", "Visvesvaraya Technological University", "Vivekanand Education Society's Institute of Technology (VESIT)", "Vivekanand Institute of Technology & Sciences", "Vivekananda College for BCA", "Vivekananda Institute of Biotechnology", "Vivekananda Institute of Technology", "Vizag Institute of Technology", "VNS Group of Institutions", "Vrije Universiteit Amsterdam", "Wake Forest University", "Wake Technical Community College", "Walchand College of Engineering", "Walnut Hill College", "Walt Whitman High School", "Walter Biddle Saul High School", "Ward Melville High School", "Wardlaw + Hartridge School", "Warren County Technical High School", "Warsaw School of Economics", "Warsaw University of Technology", "Wartburg College", "Washington and Lee University", "Washington State University", "Washington Township High School", "Washington University in St. Louis", "Waterloo Collegiate Institute", "Waunakee High School", "Wayne State University", "Webb Bridge Middle School", "Wellesley College", "Wellington C. Mepham Highschool", "Wells College", "Wentworth Institute of Technology", "Wesleyan University", "West Chester University", "West Essex Regional High School", "West Morris Mendham High School", "West Philadelphia High School", "West Potomac High School", "West Scranton High School", "West Windsor-Plainsboro High School North", "West Windsor-Plainsboro High School South", "Westdale Secondary School", "Western Carolina University", "Western Connecticut State University", "Western Governors University", "Western Kentucky University", "Western Michigan University", "Western New England University", "Western Technical College", "Western University", "Western Washington University", "Westfield High School", "Westminster College", "Westminster School", "Westwood High School", "Whitefish Bay High School", "Whitworth University", "Wichita State University", "Widener University", "Wilbert Tucker Woodson High School", "Wilfrid Laurier University", "Wilkes University", "William & Mary", "William L. Sayre High School", "William Lyon Mackenzie Collegiate Institute", "William Paterson University", "William W. Bodine High School", "Williams College", "Williamson Free School of Mechanical Trades", "Wilmington University", "Wiltshire College", "Winona State University", "Winston Churchill High School", "Winthrop University", "Woodbridge High School - Bridgeville", "Woodbridge High School - Irvine", "Woodbridge High School - London", "Woodbridge High School - Woodbridge, NJ", "Woodbridge High School - Woodbridge, ON", "Woodbridge High School - Woodbridge, VA", "Worcester Polytechnic Institute", "Worcester State University", "World Communications Charter School", "Wright State University", "WrocÅ‚aw University of Economics", "WrocÅ‚aw University of Technology", "Wuhan University", "WyÅ¼sza SzkoÅ‚a Biznesu â€“ National-Louis University", "Xavier Institute of Management Entrepreneurship Development (XIME)", "Xavier Research Foundation Loyola Centre for Research and Development St Xavier's College", "Xavier University", "Yale University", "Yale-NUS College", "Yeshiva University", "York College of Pennsylvania", "York College, CUNY", "York University", "Youngstown State University", "YouthBuild Philadelphia Charter School", "Zakir Hussain College of Engineering and Technology, AMU", "ZespÃ³Å‚ SzkÃ³Å‚ im. Jana PawÅ‚a II w NiepoÅ‚omicach", "ZespÃ³Å‚ SzkÃ³Å‚ nr 1 im. Jana PawÅ‚a II w Przysusze", "ZespÃ³Å‚ szkÃ³Å‚ nr 1 im. StanisÅ‚awa Staszica w Bochni", "ZespÃ³Å‚ SzkÃ³Å‚ Nr.2 im. Jana PawÅ‚a II w Miechowie", "ZespÃ³Å‚ SzkÃ³Å‚ ÅÄ…cznoÅ›ci, Monte Cassino 31", "Ã‰cole Centrale Paris", "Ã‰cole de technologie supÃ©rieure", "Ã‰cole nationale supÃ©rieure dâ€™Ã©lectronique, informatique, tÃ©lÃ©communications, mathÃ©matique et mÃ©canique de Bordeaux (ENSEIRB-MATMECA)", "Ã‰cole Polytechnique de MontrÃ©al"]
const countries = [
    "United States of America (the)",
	"Afghanistan",
	"Albania",
	"Algeria",
	"American Samoa",
	"Andorra",
	"Angola",
	"Anguilla",
	"Antarctica",
	"Antigua and Barbuda",
	"Argentina",
	"Armenia",
	"Aruba",
	"Australia",
	"Austria",
	"Azerbaijan",
	"Bahamas (the)",
	"Bahrain",
	"Bangladesh",
	"Barbados",
	"Belarus",
	"Belgium",
	"Belize",
	"Benin",
	"Bermuda",
	"Bhutan",
	"Bolivia (Plurinational State of)",
	"Bonaire, Sint Eustatius and Saba",
	"Bosnia and Herzegovina",
	"Botswana",
	"Bouvet Island",
	"Brazil",
	"British Indian Ocean Territory (the)",
	"Brunei Darussalam",
	"Bulgaria",
	"Burkina Faso",
	"Burundi",
	"Cabo Verde",
	"Cambodia",
	"Cameroon",
	"Canada",
	"Cayman Islands (the)",
	"Central African Republic (the)",
	"Chad",
	"Chile",
	"China",
	"Christmas Island",
	"Cocos (Keeling) Islands (the)",
	"Colombia",
	"Comoros (the)",
	"Congo (the Democratic Republic of the)",
	"Congo (the)",
	"Cook Islands (the)",
	"Costa Rica",
	"Croatia",
	"Cuba",
	"Curaçao",
	"Cyprus",
	"Czechia",
	"Côte d'Ivoire",
	"Denmark",
	"Djibouti",
	"Dominica",
	"Dominican Republic (the)",
	"Ecuador",
	"Egypt",
	"El Salvador",
	"Equatorial Guinea",
	"Eritrea",
	"Estonia",
	"Eswatini",
	"Ethiopia",
	"Falkland Islands (the) [Malvinas]",
	"Faroe Islands (the)",
	"Fiji",
	"Finland",
	"France",
	"French Guiana",
	"French Polynesia",
	"French Southern Territories (the)",
	"Gabon",
	"Gambia (the)",
	"Georgia",
	"Germany",
	"Ghana",
	"Gibraltar",
	"Greece",
	"Greenland",
	"Grenada",
	"Guadeloupe",
	"Guam",
	"Guatemala",
	"Guernsey",
	"Guinea",
	"Guinea-Bissau",
	"Guyana",
	"Haiti",
	"Heard Island and McDonald Islands",
	"Holy See (the)",
	"Honduras",
	"Hong Kong",
	"Hungary",
	"Iceland",
	"India",
	"Indonesia",
	"Iran (Islamic Republic of)",
	"Iraq",
	"Ireland",
	"Isle of Man",
	"Israel",
	"Italy",
	"Jamaica",
	"Japan",
	"Jersey",
	"Jordan",
	"Kazakhstan",
	"Kenya",
	"Kiribati",
	"Korea (the Democratic People's Republic of)",
	"Korea (the Republic of)",
	"Kuwait",
	"Kyrgyzstan",
	"Lao People's Democratic Republic (the)",
	"Latvia",
	"Lebanon",
	"Lesotho",
	"Liberia",
	"Libya",
	"Liechtenstein",
	"Lithuania",
	"Luxembourg",
	"Macao",
	"Madagascar",
	"Malawi",
	"Malaysia",
	"Maldives",
	"Mali",
	"Malta",
	"Marshall Islands (the)",
	"Martinique",
	"Mauritania",
	"Mauritius",
	"Mayotte",
	"Mexico",
	"Micronesia (Federated States of)",
	"Moldova (the Republic of)",
	"Monaco",
	"Mongolia",
	"Montenegro",
	"Montserrat",
	"Morocco",
	"Mozambique",
	"Myanmar",
	"Namibia",
	"Nauru",
	"Nepal",
	"Netherlands (the)",
	"New Caledonia",
	"New Zealand",
	"Nicaragua",
	"Niger (the)",
	"Nigeria",
	"Niue",
	"Norfolk Island",
	"Northern Mariana Islands (the)",
	"Norway",
	"Oman",
	"Pakistan",
	"Palau",
	"Palestine, State of",
	"Panama",
	"Papua New Guinea",
	"Paraguay",
	"Peru",
	"Philippines (the)",
	"Pitcairn",
	"Poland",
	"Portugal",
	"Puerto Rico",
	"Qatar",
	"Republic of North Macedonia",
	"Romania",
	"Russian Federation (the)",
	"Rwanda",
	"Réunion",
	"Saint Barthélemy",
	"Saint Helena, Ascension and Tristan da Cunha",
	"Saint Kitts and Nevis",
	"Saint Lucia",
	"Saint Martin (French part)",
	"Saint Pierre and Miquelon",
	"Saint Vincent and the Grenadines",
	"Samoa",
	"San Marino",
	"Sao Tome and Principe",
	"Saudi Arabia",
	"Senegal",
	"Serbia",
	"Seychelles",
	"Sierra Leone",
	"Singapore",
	"Sint Maarten (Dutch part)",
	"Slovakia",
	"Slovenia",
	"Solomon Islands",
	"Somalia",
	"South Africa",
	"South Georgia and the South Sandwich Islands",
	"South Sudan",
	"Spain",
	"Sri Lanka",
	"Sudan (the)",
	"Suriname",
	"Svalbard and Jan Mayen",
	"Sweden",
	"Switzerland",
	"Syrian Arab Republic",
	"Taiwan",
	"Tajikistan",
	"Tanzania, United Republic of",
	"Thailand",
	"Timor-Leste",
	"Togo",
	"Tokelau",
	"Tonga",
	"Trinidad and Tobago",
	"Tunisia",
	"Turkey",
	"Turkmenistan",
	"Turks and Caicos Islands (the)",
	"Tuvalu",
	"Uganda",
	"Ukraine",
	"United Arab Emirates (the)",
	"United Kingdom of Great Britain and Northern Ireland (the)",
	"United States Minor Outlying Islands (the)",
	"Uruguay",
	"Uzbekistan",
	"Vanuatu",
	"Venezuela (Bolivarian Republic of)",
	"Viet Nam",
	"Virgin Islands (British)",
	"Virgin Islands (U.S.)",
	"Wallis and Futuna",
	"Western Sahara",
	"Yemen",
	"Zambia",
	"Zimbabwe",
	"Åland Islands"
];

const isBrowser = () => typeof window !== 'undefined';

function scrollToTop() {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

const validLevels = ["Undergraduate", "Graduate", "PhD"];

const invalid = (val: string | null) => {
    return val == null || val == "";
}

const Register = () => {

    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    const [active, setActive] = useState(0);

    const form = useForm({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            age: null,
            gender: '',
            ethnicity: '',
            race: '',
            shirt: '',
            study: '',
            work: '',
            school: '',
            major: '',
            graduation: '',
            gtxr: false,
            languages: [],
            xrexperience: '',
            hackathon: '',
            interests: [],
            teamwork: '',
            role: [],
            commitment: '',
            goals: [],
            resume: '',
            website: '',
            github: '',
            linkedin: '',
            answer1: '',
            answer2: '',
            mlh1: false,
            mlh2: false,
            mlh3: false,
            dietary: [],
            underrepresented: '',
            pronouns: '',
            orientation: '',
            level: '',
            country: ''
        },

        validate: (values) => {
            if (active === 0) {
                return {
                    firstname:
                        values.firstname.trim().length < 2
                            ? 'First name must include at least 2 characters'
                            : null,
                    lastname:
                        values.firstname.trim().length < 2
                            ? 'Last name must include at least 2 characters'
                            : null,
                    email: /^\S+@\S+$/.test(values.email) ? null : 'Invalid email',
                };
            }
            if (active === 1) {
                return {
                    age:
                        (invalid(values.age) || values.age == null || values.age <= 0 || values.age > 99) ? 'Invalid age' : null,
                    gender:
                        (invalid(values.gender) ? 'Must select a gender' : null),
                    ethnicity:
                        (invalid(values.ethnicity) ? 'Must select an ethnicity' : null),
                    race:
                        (invalid(values.race) ? 'Must select a race' : null),
                    country:
                        (invalid(values.country) ? 'Must select a country' : null),
                    shirt:
                        (invalid(values.shirt) ? 'Must select a shirt size' : null),
                };
            }
            if (active === 2) {
                if (invalid(values.study)) {
                    return {
                        study: 'Must select current level of study'
                    }
                } else if (values.study == "Not a Student") {
                    return {
                        work:
                            (invalid(values.work) ? 'Must select employment status' : null)
                    }
                } else if (values.study == "High School") {
                    return {
                        school:
                            (invalid(values.school) ? 'Must enter high school' :
                                values.school.trim().length < 2 ? 'High school must include at least two characters' : null),
                        graduation:
                            (invalid(values.graduation) ? 'Must enter expected graduation date' : null),
                    }
                } else {
                    return {
                        school:
                            (invalid(values.school) ? 'Must enter university' :
                                values.school.trim().length < 2 ? 'University must include at least two characters' : null),
                        major:
                            (invalid(values.major) ? 'Must enter major' :
                                values.major.trim().length < 2 ? 'Major must include at least two characters' : null),
                        graduation:
                            (invalid(values.graduation) ? 'Must enter expected graduation date' : null),
                    }
                }
            }
            if (active === 3) {
                return {
                    xrexperience:
                        (invalid(values.xrexperience) ? 'Must select XR experience level' : null),
                    hackathon:
                        (invalid(values.hackathon) ? 'Must select hackathon experience level' : null),
                    interests:
                        (values.interests == null || values.interests.length == 0 ? 'Must select interests' : null),
                    teamwork:
                        (invalid(values.teamwork) ? 'Must select teamwork style' : null),
                    role:
                        (values.role == null || values.role.length == 0 ? 'Must select role preferences' : null),
                    commitment:
                        (invalid(values.commitment) ? 'Must select commitment level' : null),
                    goals:
                        (values.goals == null || values.goals.length == 0 ? 'Must select goals' : null),
                };
            }
            if (active === 4) {
                return {
                    mlh1:
                        (values.mlh1 ? null : 'Must agree to MLH Code of Conduct'),
                    mlh2:
                        (values.mlh2 ? null : 'Must agree to MLH Contest Terms and Conditions and Privacy Policy'),
                    underrepresented:
                        (values.underrepresented == "" ? "Must select underrepresented group status" : null),
                    pronouns:
                        (values.pronouns == "" ? "Must select pronouns" : null),
                    orientation:
                        (values.orientation == "" ? "Must select orientation" : null),
                    level:
                        (values.level == "" ? "Must select level of education" : null),
                }
            }
            return {};
        },
    });

    const nextStep = () => {
        setActive((current) => {
            if (form.validate().hasErrors) {
                return current;
            }
            scrollToTop();
            return current < 7 ? current + 1 : current;
        });
    }

    const registerUser = () => {
        nextStep();
        register(user.id, form.values);
        console.log(form.values)
        setName(user.id, form.getInputProps('firstname').value + " " + form.getInputProps('lastname').value);
        dispatch(setRegistered(true));
        notifications.show({
            title: 'Successfully Registered',
            message: 'You have successfully applied for ImmerseGT 2024!',
            color: 'grape.5'
        });
    }


    const prevStep = () => {
        setActive((current) => (current > 0 ? current - 1 : current));
        scrollToTop();
    };

    const [checkedGTech, setCheckedGTech] = useState(false);
    const [verified, setVerified] = useState(false);

    const setGTech = (set: boolean) => {
        if (set) {
            setCheckedGTech(true);
            form.setValues({ school: "Georgia Institute of Technology" });
        } else {
            setCheckedGTech(false);
            form.setValues({ school: "" });
        }
    }

    return user.session == null ? (
        <main className="formContainer">
            <h2>ImmerseGT Application</h2>
            <p>Please sign up first to apply for ImmerseGT 2024.</p>
            <div className="formBox">
                <AuthenticationForm />
            </div>
        </main>
    ) : (
        <main className="formContainer">
            <h2>ImmerseGT Application</h2>
            {user.registered ? (
                <Registered />
            ) :
                (
                    <>
                        <p>Please fill out the following questions to apply for the hackathon.</p>
                        <div className="formBox">
                            <Stepper active={active} orientation="vertical" className="formStepper" color="grape.5">
                                <Stepper.Step label="Contact Information" />
                                <Stepper.Step label="Basic Information" />
                                <Stepper.Step label="Relevant Education" />
                                <Stepper.Step label="Profile Questions" />
                                <Stepper.Step label="MLH Questions" />
                                <Stepper.Step label="Additional Info" />
                                <Stepper.Step label="Final Check" />
                            </Stepper>

                            <div className="formQuestions">
                                {active === 0 ? (
                                    <div>
                                        <TextInput label="First Name" size="md" placeholder="First Name" {...form.getInputProps('firstname')} withAsterisk classNames={classes} />
                                        <TextInput mt="md" size="md" label="Last Name" placeholder="Last Name" {...form.getInputProps('lastname')} withAsterisk classNames={classes} />
                                        <TextInput mt="md" size="md" label="School Email" placeholder="name@gatech.edu" {...form.getInputProps('email')} withAsterisk classNames={classes} />
                                        <TextInput mt="md" size="md" label="Phone Number" placeholder="(123) 456-7890" {...form.getInputProps('phone')} classNames={classes} />
                                    </div>



                                ) : active === 1 ? (
                                    <div>
                                        <NumberInput
                                            label="Age"
                                            placeholder="Age"
                                            clampBehavior="strict"
                                            min={0}
                                            max={100}
                                            size="md"
                                            {...form.getInputProps('age')}
                                            withAsterisk
                                            classNames={classes}
                                        />
                                        <Autocomplete
                                            mt="md"
                                            label="Gender"
                                            placeholder="Start typing..."
                                            data={['Man', 'Woman', 'Non-binary', 'Prefer not to say']}
                                            {...form.getInputProps('gender')}
                                            withAsterisk
                                            classNames={classes}
                                        />
                                        <Select
                                            mt="md"
                                            label="Ethnicity"
                                            placeholder="Select..."
                                            data={['Hispanic or Latino', 'Not Hispanic or Latino', 'Prefer not to say']}
                                            {...form.getInputProps('ethnicity')}
                                            withAsterisk
                                            classNames={classes}
                                        />
                                        <Select
                                            mt="md"
                                            label="Race"
                                            placeholder="Select..."
                                            data={['American Indian or Alaska Native', 'Asian', 'Black or African American', 'Native Hawaiian or Other Pacific Islander', 'White', 'Prefer not to say']}
                                            {...form.getInputProps('race')}
                                            withAsterisk
                                            classNames={classes}
                                        />
                                        <Autocomplete mt="md" label="Country of Residence" placeholder="Start typing..." {...form.getInputProps('country')} data={countries} withAsterisk classNames={classes} />

                                        <Select
                                            mt="md"
                                            label="T-Shirt Size"
                                            placeholder="Select..."
                                            data={['XS', 'S', 'M', 'L', 'XL', 'XXL']}
                                            {...form.getInputProps('shirt')}
                                            withAsterisk
                                            classNames={classes}
                                        />
                                    </div>



                                ) : active === 2 ? (
                                    <div>
                                        <Select
                                            label="Current Level of Study"
                                            placeholder="Select..."
                                            data={['Undergraduate', 'Graduate', 'PhD', 'Not a Student']}
                                            {...form.getInputProps('study')}
                                            withAsterisk
                                            classNames={classes}
                                        />
                                        {validLevels.includes(form.getInputProps('study').value) ? (
                                            <div>
                                                <Checkbox mt="md" color="grape.5" label="I am a Georgia Tech Student." checked={checkedGTech} onChange={(event) => setGTech(event.currentTarget.checked)} />
                                                <Autocomplete mt="md" label="University" placeholder="Start typing..." {...form.getInputProps('school')} withAsterisk data={schools} limit={50} classNames={classes} />
                                                <Autocomplete mt="md" label="Major/Field of Study" placeholder="Start typing..." {...form.getInputProps('major')} withAsterisk                                             data={['Computer science, computer engineering, or software engineering',
                                                'Another engineering discipline (such as civil, electrical, mechanical, etc.)',
                                                'Information systems, information technology, or system administration',
                                                'A natural science (such as biology, chemistry, physics, etc.)',
                                                'Mathematics or statistics',
                                                'Web development or web design',
                                                'Business discipline (such as accounting, finance, marketing, etc.)',
                                                'Humanities discipline (such as literature, history, philosophy, etc.)',
                                                'Social science (such as anthropology, psychology, political science, etc.)',
                                                'Fine arts or performing arts (such as graphic design, music, studio art, etc.)',
                                                'Health science (such as nursing, pharmacy, radiology, etc.)',
                                                'Undecided / No Declared Major',
                                                'My school does not offer majors / primary areas of study',
                                                'Prefer not to answer']} classNames={classes} />
                                                <Select
                                                    mt="md"
                                                    label="Graduation Year"
                                                    placeholder="Select..."
                                                    data={['2024', '2025', '2026', '2027', '2028', 'Other']}
                                                    {...form.getInputProps('graduation')}
                                                    withAsterisk
                                                    classNames={classes}
                                                />
                                            </div>
                                        ) : form.getInputProps('study').value == "High School" ? (
                                            <div>
                                                <TextInput mt="md" label="High School" placeholder="High School" {...form.getInputProps('school')} withAsterisk classNames={classes} />
                                                <Select
                                                    mt="md"
                                                    label="Graduation Year"
                                                    placeholder="Select..."
                                                    data={['2024', '2025', '2026', '2027', '2028', 'Other']}
                                                    {...form.getInputProps('graduation')}
                                                    withAsterisk
                                                    classNames={classes}
                                                />
                                            </div>
                                        ) : form.getInputProps('study').value == "Not a Student" ? (
                                            <div>
                                                <Select
                                                    mt="md"
                                                    label="Employment"
                                                    placeholder="Select..."
                                                    data={['Employed', 'Looking for Job', 'Unemployed', 'Not Looking For Job', 'Prefer Not To Say']}
                                                    {...form.getInputProps('work')}
                                                    withAsterisk
                                                    classNames={classes}
                                                />
                                            </div>
                                        ) :
                                            (<></>)}
                                    </div>

                                ) : active === 3 ? (
                                    <div>
                                        <Fieldset legend="Attendance" className="noBackground">
                                            <Checkbox mt="md" color="grape.5" label="I am a member of GTXR." {...form.getInputProps('gtxr')} />
                                        </Fieldset>
                                        <br />
                                        <Fieldset legend="Skills" className="noBackground">
                                            <MultiSelect
                                                mt="md"
                                                label="Languages"
                                                placeholder="Select..."
                                                data={['C#', 'C++', 'Javascript', 'Typescript', 'Java', 'Swift', 'Python', 'HTML/CSS', 'Kotlin', 'Objective-C', 'GLSL', 'HLSL', 'Lua', 'Ruby', 'Go', 'Rust', 'PHP', 'C']}
                                                {...form.getInputProps('languages')}
                                                withAsterisk
                                                classNames={classes}
                                            />
                                            <Select
                                                mt="md"
                                                label="XR Experience"
                                                placeholder="Select..."
                                                data={['None', 'Beginner', 'Advanced', 'Expert']}
                                                {...form.getInputProps('xrexperience')}
                                                withAsterisk
                                                classNames={classes}
                                            />
                                            <Select
                                                mt="md"
                                                label="Hackathon Experience"
                                                placeholder="Select..."
                                                data={['None', 'Beginner', 'Advanced', 'Expert']}
                                                {...form.getInputProps('hackathon')}
                                                withAsterisk
                                                classNames={classes}
                                            />
                                            <MultiSelect
                                                mt="md"
                                                label="Interest Areas"
                                                placeholder="Select..."
                                                data={['Augmented Reality', 'Virtual Reality', 'Mixed Reality', 'Not Sure']}
                                                {...form.getInputProps('interests')}
                                                withAsterisk
                                                classNames={classes}
                                            />
                                        </Fieldset>
                                        <br />
                                        <Fieldset legend="Team Preferences" className="noBackground">
                                            <Select
                                                label="Teamwork Style"
                                                placeholder="Select..."
                                                data={['Solo Hacker', 'Teaming with Friends', 'Looking for Team', 'Unsure']}
                                                {...form.getInputProps('teamwork')}
                                                withAsterisk
                                                classNames={classes}
                                            />
                                            <MultiSelect
                                                mt="md"
                                                label="Member Role Preferences"
                                                placeholder="Select..."
                                                data={['Project Manager', 'XR Developer', '3D Artist', 'Sound Designer', 'Project Tester', 'Frontend Developer', 'Backend Developer', 'UI/UX Designer', 'Business']}
                                                {...form.getInputProps('role')}
                                                withAsterisk
                                                classNames={classes}
                                            />
                                            <Select
                                                mt="md"
                                                label="Commitment Level"
                                                placeholder="Select..."
                                                data={['Low', 'Medium', 'High']}
                                                {...form.getInputProps('commitment')}
                                                withAsterisk
                                                classNames={classes}
                                            />
                                            <MultiSelect
                                                mt="md"
                                                label="Goals"
                                                placeholder="Select..."
                                                data={['Learn New Skills', 'Build My Portfolio', 'Network With Others', 'Win Awards/Prizes', 'Here For A Good Time']}
                                                {...form.getInputProps('goals')}
                                                withAsterisk
                                                classNames={classes}
                                            />
                                        </Fieldset>
                                    </div>
                                ) : active === 4 ? (
                                    <div>
                                        <p>As an MLH partner, we are required to ask the following questions.</p>
                                        <Checkbox mt="md" color="grape.5" label={
                                            <>
                                                I have read and agree to the{' '}
                                                <a href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf" target="_blank" rel="noopener noreferrer">
                                                    MLH Code of Conduct.
                                                </a>
                                            </>
                                        } {...form.getInputProps('mlh1')} />
                                        <Checkbox mt="md" color="grape.5" label={
                                            <>
                                                I authorize you to share my application/registration information with Major League Hacking for event administration,
                                                ranking, and MLH administration in-line with the{' '}
                                                <a href="https://mlh.io/privacy" target="_blank" rel="noopener noreferrer">
                                                    MLH Privacy Policy.
                                                </a>
                                                {' '}I further agree to the terms of both the{' '}
                                                <a href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md" target="_blank" rel="noopener noreferrer">
                                                    MLH Contest Terms and Conditions
                                                </a>
                                                {' '}and the{' '}
                                                <a href="https://mlh.io/privacy" target="_blank" rel="noopener noreferrer">
                                                    MLH Privacy Policy
                                                </a>
                                            </>
                                        } {...form.getInputProps('mlh2')} />
                                        <Checkbox mt="md" color="grape.5"
                                            label="I authorize MLH to send me occasional emails about relevant events, career opportunities, and community announcements."
                                            {...form.getInputProps('mlh3')} />

                                        <MultiSelect
                                            mt="md"
                                            label="Dietary Restrictions"
                                            placeholder="Select..."
                                            data={['Vegetarian', 'Vegan', 'Celiac Disease', 'Allergies', 'Kosher', 'Halal']}
                                            {...form.getInputProps('dietary')}
                                            classNames={classes}
                                        />
                                        <Select
                                            mt="md"
                                            label="Do you identify as part of an underrepresented group in the technology industry?"
                                            placeholder="Select..."
                                            data={['Yes', 'No', 'Unsure']}
                                            {...form.getInputProps('underrepresented')}
                                            classNames={classes}
                                            withAsterisk
                                        />
                                        <Autocomplete
                                            mt="md"
                                            label="Pronouns"
                                            placeholder="Start typing..."
                                            data={['She/Her', 'He/Him', 'They/Them', 'She/They', 'He/They', 'Prefer not to answer']}
                                            {...form.getInputProps('pronouns')}
                                            classNames={classes}
                                            withAsterisk
                                        />
                                        <Autocomplete
                                            mt="md"
                                            label="Do you consider yourself to be any of the following?"
                                            placeholder="Start typing..."
                                            data={['Heterosexual or Straight', 'Gay or Lesbian', 'Bisexual', 'Prefer not to answer', 'Different identity']}
                                            {...form.getInputProps('orientation')}
                                            classNames={classes}
                                            withAsterisk
                                        />
                                        <Autocomplete
                                            mt="md"
                                            label="What is the highest level of formal education that you have completed?"
                                            placeholder="Start typing..."
                                            data={['Less than Secondary / High School', 'Secondary / High School', 'Undergraduate University (2 year - community college or similar)', 'Undergraduate University (3+ year)', 'Graduate University (Masters, Professional, Doctoral, etc) ', 'Code School / Bootcamp', 'Other Vocational / Trade Program or Apprenticeship', 'I’m not currently a student', 'Prefer not to answer']}
                                            {...form.getInputProps('level')}
                                            classNames={classes}
                                            withAsterisk
                                        />
                                    </div>
                                ) : active === 5 ? (
                                    <div>
                                        <p>These additional questions are optional but could be used for application decisions depending on how many applications we receive.</p>
                                        <TextInput mt="md" label="Resume" placeholder="Resume" {...form.getInputProps('resume')} classNames={classes} />
                                        <TextInput mt="md" label="Website" placeholder="Website" {...form.getInputProps('website')} classNames={classes} />
                                        <TextInput mt="md" label="Github" placeholder="https://github.com/..." {...form.getInputProps('github')} classNames={classes} />
                                        <TextInput mt="md" label="Linkedin" placeholder="https://www.linkedin.com/in/..." {...form.getInputProps('linkedin')} classNames={classes} />
                                        <TextInput mt="md" label="Describe your experience with coding and/or XR." placeholder="Answer here..." {...form.getInputProps('answer1')} classNames={classes} />
                                        <TextInput mt="md" label="Why do you want to participate in ImmerseGT?" placeholder="Answer here..." {...form.getInputProps('answer2')} classNames={classes} />
                                    </div>
                                ) : active === 6 ? (
                                    <div>
                                        <p>Your data will not be provided to the ImmerseGT organizers until you click apply. Please double check your
                                            responses on the previous pages before you submit as you will not be able to change your answers.
                                        </p>
                                        <Checkbox mt="md" color="grape.5" label="I am ready to apply for ImmerseGT 2024." checked={verified} onChange={(event) => setVerified(event.currentTarget.checked)} />
                                    </div>
                                ) : (
                                    <div>
                                        <p>Thank you for applying for ImmerseGT 2024! We will be in touch with further updates as we get closer to the hackathon start date.
                                            In the meantime, feel free to <Link href="https://discord.gg/bwnbCMDzxK">join our Discord</Link> to network with other participants.</p>
                                    </div>
                                )}
                                <Group justify="flex-end" mt="xl">
                                    {active !== 0 && (
                                        <Button variant="default" onClick={prevStep}>
                                            Back
                                        </Button>
                                    )}
                                    {active < 6 && <Button onClick={nextStep} color="grape.5">Next step</Button>}
                                    {active === 6 && <Button onClick={registerUser} color="grape.5" disabled={!verified}>Apply</Button>}
                                </Group>
                            </div>
                        </div>
                    </>
                )}
        </main>
    );
}

export default Register;