<?php

return [
    [
        "name" => "General Surgery",
        "weight" => 18,
        "diseases" => [
            [
                "name" => "Acute Appendicitis",
                "symptoms" => [
                    "Right lower quadrant abdominal pain",
                    "Nausea and vomiting",
                    "Anorexia",
                    "Low-grade fever",
                    "Rebound tenderness (McBurney point)"
                ],
                "diagnoses" => [
                    "Acute uncomplicated appendicitis",
                    "Acute gangrenous appendicitis",
                    "Perforated appendicitis with localized peritonitis"
                ],
                "medications" => [
                    "Cefuroxime",
                    "Metronidazole",
                    "Paracetamol IV",
                    "Tramadol"
                ],
                "templates" => [
                    "Patient presented with a 24-hour history of periumbilical pain migrating to the right lower quadrant, accompanied by nausea and anorexia. Physical exam revealed McBurney point tenderness and localized rebound. Leucocytosis noted on CBC. Abdominal ultrasound confirmed acute appendicitis. Scheduled for laparoscopic appendectomy."
                ]
            ],
            [
                "name" => "Acute Cholecystitis",
                "symptoms" => [
                    "Right upper quadrant pain",
                    "Murphy's sign positive",
                    "Fever",
                    "Nausea after fatty meal",
                    "Leukocytosis"
                ],
                "diagnoses" => [
                    "Acute calculous cholecystitis",
                    "Chronic cholecystitis with acute exacerbation",
                    "Acalculous cholecystitis"
                ],
                "medications" => [
                    "Ceftriaxone",
                    "Metronidazole",
                    "Ketorolac",
                    "Hyoscine butylbromide"
                ],
                "templates" => [
                    "45-year-old patient presented with severe persistent RUQ pain radiating to the right scapula following a fatty dinner. Positive Murphy sign on palpation. Ultrasound showed gallbladder wall thickening (4mm) and gallstones. Conservative management started; laparoscopic cholecystectomy planned."
                ]
            ],
            [
                "name" => "Inguinal Hernia",
                "symptoms" => [
                    "Groin swelling/bulge",
                    "Localized discomfort or dragging sensation",
                    "Pain exacerbated by coughing or lifting"
                ],
                "diagnoses" => [
                    "Indirect inguinal hernia",
                    "Direct inguinal hernia",
                    "Incarcerated inguinal hernia"
                ],
                "medications" => [
                    "Ibuprofen",
                    "Paracetamol"
                ],
                "templates" => [
                    "Patient reports a reducible painless bulge in the right groin area persisting for 3 months, worsening with prolonged standing. On examination, an impulse was felt on coughing. No signs of strangulation or bowel obstruction. Elective hernioplasty recommended."
                ]
            ]
        ]
    ],
    [
        "name" => "General Surgery",
        "weight" => 8,
        "diseases" => [
            [
                "name" => "Acute Small Bowel Obstruction",
                "symptoms" => [
                    "Crampy abdominal pain",
                    "Abdominal distension",
                    "Obstipation/Constipation",
                    "Bilious vomiting"
                ],
                "diagnoses" => [
                    "Adhesive small bowel obstruction",
                    "Strangulated intestinal obstruction",
                    "Volvulus"
                ],
                "medications" => [
                    "IV Fluids (Normal Saline)",
                    "Ondansetron",
                    "Pantoprazole IV"
                ],
                "templates" => [
                    "Patient presented with severe colicky abdominal pain, persistent vomiting, and failure to pass gas or stool for 48 hours. History of prior lower abdominal surgery. Abdominal X-ray showed multiple air-fluid levels and dilated bowel loops. Nasogastric tube decompression initiated."
                ]
            ],
            [
                "name" => "Perforated Peptic Ulcer",
                "symptoms" => [
                    "Sudden onset severe epigastric pain",
                    "Board-like abdominal rigidity",
                    "Tachycardia",
                    "Shallow breathing"
                ],
                "diagnoses" => [
                    "Perforated duodenal ulcer",
                    "Perforated gastric ulcer",
                    "Acute generalized peritonitis"
                ],
                "medications" => [
                    "Cefotaxime",
                    "Metronidazole",
                    "Omeprazole IV",
                    "Morphine"
                ],
                "templates" => [
                    "52-year-old patient presented with sudden, agonizing epigastric pain radiating to the shoulders. Physical exam revealed rigid, board-like abdomen with severe generalized tenderness. Upright chest X-ray demonstrated pneumoperitoneum under the diaphragm. Emergency exploratory laparotomy arranged."
                ]
            ]
        ]
    ],
    [
        "name" => "Internal Medicine",
        "weight" => 20,
        "diseases" => [
            [
                "name" => "Essential Hypertension",
                "symptoms" => [
                    "Asymptomatic",
                    "Occasional occipital headache",
                    "Dizziness",
                    "Fatigue",
                    "Epistaxis"
                ],
                "diagnoses" => [
                    "Essential (primary) hypertension Grade 1",
                    "Essential hypertension Grade 2",
                    "Hypertensive vascular disease"
                ],
                "medications" => [
                    "Amlodipine",
                    "Lisinopril",
                    "Hydrochlorothiazide",
                    "Valsartan"
                ],
                "templates" => [
                    "Routine follow-up visit. Patient reports mild morning headaches. Blood pressure readings consistently elevated at 152/94 mmHg across three separate visits. Routine ECG and renal function tests ordered. Antihypertensive therapy initiated alongside sodium-restricted diet."
                ]
            ],
            [
                "name" => "Iron Deficiency Anemia",
                "symptoms" => [
                    "Generalized fatigue",
                    "Pallor",
                    "Shortness of breath on exertion",
                    "Dizziness",
                    "Koilonychia"
                ],
                "diagnoses" => [
                    "Microcytic hypochromic anemia secondary to iron deficiency",
                    "Chronic blood loss anemia"
                ],
                "medications" => [
                    "Ferrous Sulfate",
                    "Vitamin C (Ascorbic Acid)",
                    "Folic Acid"
                ],
                "templates" => [
                    "Patient complains of progressive fatigue and weakness over the past 2 months. Lab findings demonstrate Hb 8.5 g/dL, low MCV (68 fL), and depleted serum ferritin levels. Stool occult blood test requested to evaluate underlying source of blood loss."
                ]
            ]
        ]
    ],
    [
        "name" => "Internal Medicine",
        "weight" => 14,
        "diseases" => [
            [
                "name" => "Acute Pyelonephritis",
                "symptoms" => [
                    "High fever with chills",
                    "Flank pain / Costovertebral angle tenderness",
                    "Dysuria",
                    "Nausea and vomiting"
                ],
                "diagnoses" => [
                    "Acute uncomplicated pyelonephritis",
                    "Complicated urinary tract infection"
                ],
                "medications" => [
                    "Ciprofloxacin",
                    "Ceftriaxone IV",
                    "Paracetamol"
                ],
                "templates" => [
                    "34-year-old female presents with acute high fever (39.2°C), rigor, and severe right flank pain. Urinalysis shows pyuria, leukocyte esterase, and positive nitrites. CVA tenderness positive on right side. IV antibiotic therapy initiated."
                ]
            ]
        ]
    ],
    [
        "name" => "Pediatrics",
        "weight" => 19,
        "diseases" => [
            [
                "name" => "Acute Bronchiolitis",
                "symptoms" => [
                    "Wheezing",
                    "Paroxysmal cough",
                    "Low-grade fever",
                    "Nasal congestion",
                    "Tachypnea",
                    "Intercostal retractions"
                ],
                "diagnoses" => [
                    "Acute viral bronchiolitis (RSV-related)",
                    "Acute mild-to-moderate bronchiolitis"
                ],
                "medications" => [
                    "Hypertonic Saline nebulization",
                    "Paracetamol pediatric syrup",
                    "Nasal saline drops"
                ],
                "templates" => [
                    "10-month-old infant brought by parents due to 3 days of coryza followed by tachypnea and audible wheezing. O2 saturation 94% on room air. Chest examination demonstrates bilateral fine crepitations and expiratory wheezing. Supportive care and nasal suctioning initiated."
                ]
            ],
            [
                "name" => "Acute Otitis Media",
                "symptoms" => [
                    "Otalgia (ear pain)",
                    "Irritability / Ear tugging in infants",
                    "Fever",
                    "Decreased appetite",
                    "Temporary hearing impairment"
                ],
                "diagnoses" => [
                    "Acute suppurative otitis media",
                    "Bilateral acute otitis media"
                ],
                "medications" => [
                    "Amoxicillin-Clavulanate pediatric suspension",
                    "Ibuprofen pediatric syrup"
                ],
                "templates" => [
                    "2-year-old child presents with sudden onset fever and persistent tugging at the right ear following an upper respiratory infection. Otoscopy reveals a bulging, erythematous right tympanic membrane with loss of light reflex. Oral antibiotic prescribed."
                ]
            ]
        ]
    ],
    [
        "name" => "Obstetrics and Gynecology",
        "weight" => 16,
        "diseases" => [
            [
                "name" => "Polycystic Ovary Syndrome (PCOS)",
                "symptoms" => [
                    "Oligomenorrhea or amenorrhea",
                    "Hirsutism",
                    "Acne",
                    "Weight gain",
                    "Infertility"
                ],
                "diagnoses" => [
                    "Polycystic ovary syndrome",
                    "Hyperandrogenism"
                ],
                "medications" => [
                    "Combined Oral Contraceptive Pills",
                    "Metformin",
                    "Spironolactone"
                ],
                "templates" => [
                    "24-year-old female reports irregular menstrual cycles (3-4 periods per year) accompanied by facial hirsutism and persistent acne. Pelvic ultrasound demonstrates bilateral polycystic ovarian morphology ('string of pearls' appearance). Hormonal profile and metabolic screen ordered."
                ]
            ],
            [
                "name" => "Urinary Tract Infection in Pregnancy",
                "symptoms" => [
                    "Dysuria",
                    "Urinary frequency",
                    "Urgency",
                    "Suprapubic discomfort"
                ],
                "diagnoses" => [
                    "Acute cystitis in pregnancy",
                    "Asymptomatic bacteriuria of pregnancy"
                ],
                "medications" => [
                    "Nitrofurantoin",
                    "Cefalexin"
                ],
                "templates" => [
                    "22-week pregnant female presents for routine antenatal care complaining of burning sensation during urination for 2 days. Urinalysis shows pyuria and positive nitrites. Urine culture sent. Started on pregnancy-safe oral antibiotic therapy."
                ]
            ]
        ]
    ],
    [
        "name" => "Cardiology",
        "weight" => 17,
        "diseases" => [
            [
                "name" => "Coronary Artery Disease",
                "symptoms" => [
                    "Substernal chest pressure/angina",
                    "Radiation of pain to left arm or jaw",
                    "Exertional dyspnea",
                    "Diaphoresis"
                ],
                "diagnoses" => [
                    "Stable angina pectoris",
                    "Unstable angina",
                    "Acute Non-ST-elevation myocardial infarction (NSTEMI)"
                ],
                "medications" => [
                    "Aspirin",
                    "Clopidogrel",
                    "Atorvastatin",
                    "Bisoprolol",
                    "Nitroglycerin sublingual"
                ],
                "templates" => [
                    "Patient with a history of smoking and dyslipidemia reports retrosternal squeezing chest tightness precipitated by physical exertion and relieved by rest. ECG shows mild ST-segment depressions in anterior leads. Troponin I negative. Scheduled for coronary angiography."
                ]
            ],
            [
                "name" => "Congestive Heart Failure",
                "symptoms" => [
                    "Paroxysmal nocturnal dyspnea",
                    "Orthopnea",
                    "Bilateral lower extremity edema",
                    "Fatigue",
                    "Jugular venous distension"
                ],
                "diagnoses" => [
                    "Heart failure with reduced ejection fraction (HFrEF)",
                    "Acute decompensated heart failure"
                ],
                "medications" => [
                    "Furosemide",
                    "Spironolactone",
                    "Sacubitril/Valsartan",
                    "Carvedilol"
                ],
                "templates" => [
                    "Patient presents with worsening dyspnea on minimal exertion and 3-pillow orthopnea. Physical examination reveals bilateral basilar lung crackles and 2+ pitting pedal edema. Echocardiogram reveals LVEF of 35%. Intravenous diuretic therapy started."
                ]
            ]
        ]
    ],
    [
        "name" => "Orthopedic Surgery",
        "weight" => 15,
        "diseases" => [
            [
                "name" => "Knee Osteoarthritis",
                "symptoms" => [
                    "Mechanical knee pain worsening with weight-bearing",
                    "Morning stiffness < 30 minutes",
                    "Joint crepitus",
                    "Joint effusion"
                ],
                "diagnoses" => [
                    "Primary localized osteoarthritis of knee",
                    "Bilateral gonarthrosis"
                ],
                "medications" => [
                    "Meloxicam",
                    "Paracetamol",
                    "Topical Diclofenac Gel",
                    "Glucosamine"
                ],
                "templates" => [
                    "58-year-old patient presents with chronic bilateral knee pain, right worse than left, aggravated by stair climbing. Physical exam reveals crepitus and mild medial joint line tenderness. X-ray shows joint space narrowing and subchondral sclerosis. Conservative management started."
                ]
            ],
            [
                "name" => "Lumbar Disc Herniation",
                "symptoms" => [
                    "Low back pain",
                    "Unilateral sciatica radiating to leg",
                    "Paresthesia in dermatomal distribution",
                    "Positive straight leg raise test"
                ],
                "diagnoses" => [
                    "Lumbar disc herniation L4-L5",
                    "Lumbar radiculopathy"
                ],
                "medications" => [
                    "Pregabalin",
                    "Celecoxib",
                    "Methocarbamol"
                ],
                "templates" => [
                    "Patient complains of sharp lower back pain radiating down the posterior right thigh to the calf following heavy lifting. Straight leg raise test positive at 45 degrees on the right. Sensory blunting in L5 dermatome. Lumbar MRI requested."
                ]
            ]
        ]
    ],
    [
        "name" => "Ophthalmology",
        "weight" => 12,
        "diseases" => [
            [
                "name" => "Senile Cataract",
                "symptoms" => [
                    "Painless progressive blurred vision",
                    "Glare and halos around lights",
                    "Decreased color perception",
                    "Frequent prescription changes"
                ],
                "diagnoses" => [
                    "Age-related nuclear cataract",
                    "Cortical senile cataract"
                ],
                "medications" => [
                    "Lubricating eye drops"
                ],
                "templates" => [
                    "67-year-old patient complains of gradual painless decline in visual acuity in both eyes over the past year, particularly noticing difficulty driving at night due to glare. Slit-lamp exam reveals bilateral nuclear sclerotic cataract changes. Phacoemulsification surgery discussed."
                ]
            ],
            [
                "name" => "Bacterial Conjunctivitis",
                "symptoms" => [
                    "Redness in eye",
                    "Purulent mucopurulent discharge",
                    "Matted eyelids upon waking",
                    "Foreign body sensation"
                ],
                "diagnoses" => [
                    "Acute bacterial conjunctivitis"
                ],
                "medications" => [
                    "Tobramycin ophthalmic solution",
                    "Ofloxacin eye drops"
                ],
                "templates" => [
                    "Patient presents with a 2-day history of right eye redness accompanied by thick yellowish discharge causing eyelids to stick shut in the morning. Visual acuity intact, pupil reactive, no corneal staining. Diagnosed with bacterial conjunctivitis and started on topical antibiotic drops."
                ]
            ]
        ]
    ],
    [
        "name" => "Otolaryngology (ENT)",
        "weight" => 14,
        "diseases" => [
            [
                "name" => "Chronic Sinusitis",
                "symptoms" => [
                    "Facial pressure/pain",
                    "Nasal congestion",
                    "Anosmia or hyposmia",
                    "Post-nasal drip",
                    "Purulent rhinorrhea"
                ],
                "diagnoses" => [
                    "Chronic rhinosinusitis without nasal polyps",
                    "Chronic rhinosinusitis with nasal polyposis"
                ],
                "medications" => [
                    "Fluticasone nasal spray",
                    "Nasal saline irrigation",
                    "Amoxicillin-Clavulanate"
                ],
                "templates" => [
                    "Patient reports persistent facial pressure, nasal blockage, and discolored nasal discharge for over 12 weeks. Anterior rhinoscopy shows mucosal edema and middle meatus mucopurulence. CT scan of paranasal sinuses ordered to assess ostiomeatal complex disease."
                ]
            ],
            [
                "name" => "Acute Tonsillitis",
                "symptoms" => [
                    "Severe sore throat",
                    "Odynophagia (painful swallowing)",
                    "Fever",
                    "Tonsillar exudates",
                    "Tender anterior cervical lymphadenopathy"
                ],
                "diagnoses" => [
                    "Acute streptococcal tonsillitis",
                    "Acute follicular tonsillitis"
                ],
                "medications" => [
                    "Phenoxymethylpenicillin (Penicillin V)",
                    "Paracetamol",
                    "Ibuprofen"
                ],
                "templates" => [
                    "18-year-old student presents with acute high fever (38.8°C) and severe odynophagia. Oropharyngeal examination shows enlarged, hyperemic tonsils covered with whitish exudates and swollen anterior cervical lymph nodes. Centor score 4. Oral penicillin course started."
                ]
            ]
        ]
    ],
    [
        "name" => "Dermatology",
        "weight" => 15,
        "diseases" => [
            [
                "name" => "Atopic Dermatitis",
                "symptoms" => [
                    "Intense pruritus (itching)",
                    "Dry erythematous papules/plaques",
                    "Lichenification",
                    "Excoriations"
                ],
                "diagnoses" => [
                    "Atopic dermatitis (eczema)",
                    "Infantile / Flexural eczema"
                ],
                "medications" => [
                    "Hydrocortisone ointment 1%",
                    "Betamethasone dipropionate cream",
                    "Cetirizine",
                    "Emollient moisturizer"
                ],
                "templates" => [
                    "Patient presents with severe pruritic erythematous rash localized to the antecubital and popliteal fossae. Skin appears dry with visible excoriations and mild flexural lichenification. Advice given on gentle skin care, daily emollients, and short-term topical corticosteroid application."
                ]
            ],
            [
                "name" => "Psoriasis Vulgaris",
                "symptoms" => [
                    "Well-demarcated erythematous plaques",
                    "Silvery scales",
                    "Itching or burning skin",
                    "Auspitz sign positive"
                ],
                "diagnoses" => [
                    "Psoriasis vulgaris (Plaque psoriasis)"
                ],
                "medications" => [
                    "Calcipotriol / Betamethasone topical",
                    "Coal tar ointment"
                ],
                "templates" => [
                    "32-year-old patient presents with chronic well-circumscribed red plaques covered with thick silvery scales on the extensor surfaces of knees and elbows. Nail examination shows pitting. Diagnosed with plaque psoriasis; topical vitamin D analog and steroid combination initiated."
                ]
            ]
        ]
    ],
    [
        "name" => "Neurology",
        "weight" => 13,
        "diseases" => [
            [
                "name" => "Migraine with Aura",
                "symptoms" => [
                    "Unilateral throbbing headache",
                    "Visual aura (scintillating scotoma)",
                    "Photophobia and phonophobia",
                    "Nausea and vomiting"
                ],
                "diagnoses" => [
                    "Migraine with aura",
                    "Episodic migraine without aura"
                ],
                "medications" => [
                    "Sumatriptan",
                    "Naproxen",
                    "Propranolol (prophylaxis)",
                    "Metoclopramide"
                ],
                "templates" => [
                    "Patient describes recurrent severe throbbing headaches located on the left temporal side, preceded 20 minutes by visual zigzag lines lasting 15 minutes. Headaches worsen with activity and are accompanied by intense nausea and light sensitivity. Neurological exam normal."
                ]
            ],
            [
                "name" => "Ischemic Stroke",
                "symptoms" => [
                    "Sudden facial droop",
                    "Unilateral arm/leg weakness",
                    "Dysarthria or aphasia",
                    "Ataxia / Loss of balance"
                ],
                "diagnoses" => [
                    "Acute ischemic stroke (Middle Cerebral Artery territory)",
                    "Transient Ischemic Attack (TIA)"
                ],
                "medications" => [
                    "Alteplase (r-tPA if within window)",
                    "Aspirin",
                    "Atorvastatin"
                ],
                "templates" => [
                    "62-year-old patient presented to ER within 2 hours of sudden onset right-sided hemiparesis and expressive aphasia. NIHSS score 12. Non-contrast head CT ruled out intracranial hemorrhage. Patient evaluated for intravenous thrombolysis therapy."
                ]
            ]
        ]
    ],
    [
        "name" => "Psychiatry",
        "weight" => 14,
        "diseases" => [
            [
                "name" => "Major Depressive Disorder",
                "symptoms" => [
                    "Persistent low mood",
                    "Anhedonia (loss of interest)",
                    "Insomnia or hypersomnia",
                    "Fatigue / Loss of energy",
                    "Feelings of worthlessness"
                ],
                "diagnoses" => [
                    "Major depressive disorder, single episode, moderate",
                    "Recurrent major depressive disorder"
                ],
                "medications" => [
                    "Escitalopram",
                    "Sertraline",
                    "Fluoxetine"
                ],
                "templates" => [
                    "Patient reports a 6-week history of continuous depressed mood, loss of interest in personal hobbies, persistent insomnia, and difficulty concentrating at work. Patient denies active suicidal ideation. PHQ-9 score 16 (Moderately severe). Started on SSRI therapy and referred for CBT."
                ]
            ],
            [
                "name" => "Generalized Anxiety Disorder",
                "symptoms" => [
                    "Excessive uncontrollable worry",
                    "Restlessness / Feeling keying up",
                    "Muscle tension",
                    "Fatigue",
                    "Irritability"
                ],
                "diagnoses" => [
                    "Generalized anxiety disorder (GAD)"
                ],
                "medications" => [
                    "Buspirone",
                    "Sertraline",
                    "Alprazolam (short-term)"
                ],
                "templates" => [
                    "Patient presents complaining of excessive, persistent worry regarding job performance and health for over 7 months. Associated symptoms include chronic neck muscle tension, restlessness, and non-restorative sleep. GAD-7 score 14. Psychoeducation and pharmacotherapy advised."
                ]
            ]
        ]
    ],
    [
        "name" => "Emergency Medicine",
        "weight" => 19,
        "diseases" => [
            [
                "name" => "Anaphylaxis",
                "symptoms" => [
                    "Acute urticaria / Angioedema",
                    "Stridor / Wheezing",
                    "Dyspnea",
                    "Hypotension",
                    "Abdominal cramps"
                ],
                "diagnoses" => [
                    "Anaphylactic shock secondary to severe allergic reaction",
                    "Acute anaphylaxis"
                ],
                "medications" => [
                    "Epinephrine (Adrenaline) IM",
                    "Diphenhydramine",
                    "Hydrocortisone IV",
                    "Normal Saline bolus"
                ],
                "templates" => [
                    "Patient brought to ER via ambulance following a wasp sting. Examination revealed generalized hives, facial edema, audible stridor, and blood pressure of 82/50 mmHg. Immediate intramuscular epinephrine administered along with oxygen high-flow and IV fluid resuscitation."
                ]
            ],
            [
                "name" => "Acute Polytrauma",
                "symptoms" => [
                    "Severe localized pain",
                    "Multiple contusions/lacerations",
                    "Hemodynamic instability",
                    "Altered mental status"
                ],
                "diagnoses" => [
                    "Multiple blunt traumatic injuries",
                    "Hypovolemic shock"
                ],
                "medications" => [
                    "Tranexamic Acid (TXA)",
                    "Morphine IV",
                    "Tetanus Toxoid"
                ],
                "templates" => [
                    "High-speed motor vehicle collision victim brought to trauma bay. Primary survey completed: Airway patent, bilateral chest wall tenderness, pulse 125/min, BP 90/60 mmHg. E-FAST scan positive for free fluid in Morrison's pouch. Mass transfusion protocol activated."
                ]
            ]
        ]
    ],
    [
        "name" => "Urology",
        "weight" => 15,
        "diseases" => [
            [
                "name" => "Nephrolithiasis / Ureterolithiasis",
                "symptoms" => [
                    "Severe flank pain radiating to groin",
                    "Hematuria",
                    "Nausea and vomiting",
                    "Urinary urgency"
                ],
                "diagnoses" => [
                    "Ureteral calculus with ureteric colic",
                    "Renal calculus"
                ],
                "medications" => [
                    "Tamsulosin",
                    "Ketorolac",
                    "Paracetamol IV",
                    "Ciprofloxacin"
                ],
                "templates" => [
                    "Patient presented with sudden-onset excruciating left flank pain radiating downward to the ipsilateral labia/scrotum, accompanied by gross hematuria. Non-contrast CT of kidneys, ureters, and bladder (NCCT KUB) demonstrated a 5mm obstructing calculus in the distal left ureter."
                ]
            ],
            [
                "name" => "Benign Prostatic Hyperplasia",
                "symptoms" => [
                    "Hesitancy",
                    "Weak urinary stream",
                    "Nocturia",
                    "Post-void dribbling",
                    "Urinary frequency"
                ],
                "diagnoses" => [
                    "Benign prostatic hyperplasia with lower urinary tract symptoms (LUTS)"
                ],
                "medications" => [
                    "Tamsulosin",
                    "Finasteride"
                ],
                "templates" => [
                    "65-year-old male reports progressive urinary frequency, nocturia (3-4 times per night), and incomplete bladder emptying over the past year. Digital rectal exam showed a smooth, firm, symmetrically enlarged non-tender prostate. Serum PSA within normal limits."
                ]
            ]
        ]
    ],
    [
        "name" => "Gastroenterology",
        "weight" => 17,
        "diseases" => [
            [
                "name" => "Gastroesophageal Reflux Disease (GERD)",
                "symptoms" => [
                    "Retrosternal heartburn",
                    "Acid regurgitation",
                    "Dysphagia",
                    "Chronic dry cough"
                ],
                "diagnoses" => [
                    "Gastroesophageal reflux disease without esophagitis",
                    "Erosive esophagitis Grade B"
                ],
                "medications" => [
                    "Omeprazole",
                    "Pantoprazole",
                    "Gaviscon suspension"
                ],
                "templates" => [
                    "Patient reports burning sensation in the epigastrium and substernal area occurring 30-60 minutes after meals, worsening when lying down. Symptoms temporarily relieved by antacids. Trial of high-dose PPI started; upper GI endoscopy advised if no response."
                ]
            ],
            [
                "name" => "Ulcerative Colitis",
                "symptoms" => [
                    "Bloody diarrhea",
                    "Abdominal tenesmus",
                    "Crampy lower abdominal pain",
                    "Weight loss",
                    "Fever"
                ],
                "diagnoses" => [
                    "Ulcerative colitis (left-sided / pancolitis)",
                    "Inflammatory bowel disease"
                ],
                "medications" => [
                    "Mesalazine (5-ASA)",
                    "Prednisolone oral",
                    "Azathioprine"
                ],
                "templates" => [
                    "28-year-old patient presents with 6-week history of 6-8 bloody rectal stools daily, fecal urgency, and tenesmus. Lab work demonstrates elevated C-reactive protein and mild anemia. Colonoscopy confirmed diffuse mucosal erythema, loss of vascular pattern, and friability extending to the splenic flexure."
                ]
            ]
        ]
    ],
    [
        "name" => "Pulmonology",
        "weight" => 16,
        "diseases" => [
            [
                "name" => "Bronchial Asthma",
                "symptoms" => [
                    "Recurrent episodic wheezing",
                    "Shortness of breath",
                    "Chest tightness",
                    "Nocturnal cough"
                ],
                "diagnoses" => [
                    "Moderate persistent bronchial asthma",
                    "Acute asthma exacerbation"
                ],
                "medications" => [
                    "Salbutamol inhaler (SABA)",
                    "Budesonide/Formoterol inhaler",
                    "Prednisolone oral"
                ],
                "templates" => [
                    "Patient with known history of asthma presents with increased dyspnea, dry cough, and wheezing triggered by seasonal dust exposure. Auscultation reveals bilateral diffuse expiratory wheezes. Spirometry showed FEV1/FVC ratio of 68% with significant bronchodilator reversibility."
                ]
            ],
            [
                "name" => "Community-Acquired Pneumonia",
                "symptoms" => [
                    "Productive cough with purulent sputum",
                    "Fever with chills",
                    "Pleuritic chest pain",
                    "Dyspnea"
                ],
                "diagnoses" => [
                    "Community-acquired bacterial pneumonia",
                    "Lobar pneumonia (Right lower lobe)"
                ],
                "medications" => [
                    "Amoxicillin-Clavulanate",
                    "Azithromycin",
                    "Paracetamol"
                ],
                "templates" => [
                    "Patient presents with high fever (39.1°C), rust-colored sputum cough, and right-sided sharp pleuritic chest pain for 4 days. Lung exam demonstrates localized bronchial breathing and crackles at the right lung base. Chest X-ray reveals right lower lobe consolidation."
                ]
            ]
        ]
    ],
    [
        "name" => "Endocrinology",
        "weight" => 18,
        "diseases" => [
            [
                "name" => "Type 2 Diabetes Mellitus",
                "symptoms" => [
                    "Polyuria",
                    "Polydipsia",
                    "Unexplained weight loss",
                    "Fatigue",
                    "Blurred vision"
                ],
                "diagnoses" => [
                    "Type 2 diabetes mellitus uncontrolled",
                    "Type 2 diabetes mellitus with peripheral neuropathy"
                ],
                "medications" => [
                    "Metformin",
                    "Empagliflozin",
                    "Sitagliptin",
                    "Gliclazide"
                ],
                "templates" => [
                    "48-year-old patient evaluated for persistent excessive thirst and frequent nighttime urination for 3 months. Fasting plasma glucose recorded at 186 mg/dL and HbA1c measured at 8.8%. Initiated on Metformin along with diabetic lifestyle modifications and diet consultation."
                ]
            ],
            [
                "name" => "Primary Hypothyroidism",
                "symptoms" => [
                    "Cold intolerance",
                    "Weight gain despite poor appetite",
                    "Constipation",
                    "Dry skin / Hair loss",
                    "Fatigue / Lethargy"
                ],
                "diagnoses" => [
                    "Primary hypothyroidism (Hashimoto's thyroiditis)"
                ],
                "medications" => [
                    "Levothyroxine Sodium"
                ],
                "templates" => [
                    "Patient complains of progressive fatigue, unexplained weight gain of 6 kg over 4 months, cold intolerance, and dry coarse skin. Thyroid function panel reveals elevated TSH (14.2 mIU/L) and low free T4 (0.6 ng/dL). Daily Levothyroxine therapy commenced."
                ]
            ]
        ]
    ],
    [
        "name" => "Rheumatology",
        "weight" => 11,
        "diseases" => [
            [
                "name" => "Rheumatoid Arthritis",
                "symptoms" => [
                    "Symmetrical polyarthritis",
                    "Morning stiffness > 1 hour",
                    "Swelling of MCP and PIP joints",
                    "Fatigue"
                ],
                "diagnoses" => [
                    "Seropositive rheumatoid arthritis",
                    "Seronegative rheumatoid arthritis"
                ],
                "medications" => [
                    "Methotrexate",
                    "Folic Acid",
                    "Prednisolone",
                    "Leflunomide"
                ],
                "templates" => [
                    "38-year-old female presents with 3 months of symmetrical joint pain and swelling in bilateral wrists, MCP, and PIP joints, accompanied by morning stiffness lasting nearly 2 hours. Serum Rheumatoid Factor (RF) and Anti-CCP antibodies positive."
                ]
            ],
            [
                "name" => "Gouty Arthritis",
                "symptoms" => [
                    "Sudden onset severe monoarthritis",
                    "Erythema, warmth, and marked swelling",
                    "Extreme tenderness (1st MTP joint common)"
                ],
                "diagnoses" => [
                    "Acute gouty arthritis",
                    "Hyperuricemia with gouty tophi"
                ],
                "medications" => [
                    "Colchicine",
                    "Indomethacin",
                    "Allopurinol (chronic management)"
                ],
                "templates" => [
                    "52-year-old male presents with excruciating pain, redness, and swelling of the right first metatarsophalangeal joint (podagra) that woke him up during the night after heavy meat consumption. Serum uric acid elevated at 9.2 mg/dL."
                ]
            ]
        ]
    ],
    [
        "name" => "Nephrology",
        "weight" => 12,
        "diseases" => [
            [
                "name" => "Chronic Kidney Disease",
                "symptoms" => [
                    "Bilateral peripheral edema",
                    "Fatigue / Anorexia",
                    "Oliguria or nocturia",
                    "Nausea",
                    "Elevated blood pressure"
                ],
                "diagnoses" => [
                    "Chronic kidney disease Stage 3b",
                    "Chronic kidney disease Stage 4 secondary to diabetic nephropathy"
                ],
                "medications" => [
                    "Lisinopril / Losartan",
                    "Furosemide",
                    "Calcium Carbonate (phosphate binder)",
                    "Erythropoietin"
                ],
                "templates" => [
                    "60-year-old patient with long-standing diabetes and hypertension presented with generalized lethargy and persistent lower limb swelling. Serum creatinine elevated at 2.8 mg/dL with eGFR calculated at 22 mL/min/1.73m2. Proteinuria noted on urinalysis."
                ]
            ],
            [
                "name" => "Nephrotic Syndrome",
                "symptoms" => [
                    "Generalized severe edema (Anasarca)",
                    "Periorbital swelling",
                    "Frothy urine",
                    "Fatigue"
                ],
                "diagnoses" => [
                    "Nephrotic syndrome (Minimal Change Disease / FSGS)"
                ],
                "medications" => [
                    "Prednisolone",
                    "Furosemide",
                    "Ramipril",
                    "Atorvastatin"
                ],
                "templates" => [
                    "Patient presents with marked facial puffiness (especially periorbital upon waking) and severe bilateral pitting pedal edema. 24-hour urine protein quantification demonstrates heavy proteinuria (4.5 g/day). Serum albumin low at 2.2 g/dL with severe hyperlipidemia."
                ]
            ]
        ]
    ]
];
