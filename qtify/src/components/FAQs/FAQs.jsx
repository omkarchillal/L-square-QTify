// import styles from "./faqs.module.css";
// import * as React from "react";
// import Accordion from "@mui/material/Accordion";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import AccordionDetails from "@mui/material/AccordionDetails";
// import Typography from "@mui/material/Typography";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// let query = {
//   "Is QTify free to use?": "Yes! It is 100% free, and has 0% ads!",
//   "Can I download and listen to songs offline?":
//     "Sorry, unfortunately we don't provide the service to download any songs.",
// };

// const FAQs = () => {
//   return (
//     <div className={styles.FaqsWrapper}>
//       <div className={styles.Faqs}>
//         <h1>FAQs</h1>

//         {Object.keys(query).map((question, index) => {
//           return (
//             <Accordion key={question} className={styles.accordion}>
//               <AccordionSummary
//                 expandIcon={<ExpandMoreIcon className={styles.expandIcon} />}
//                 aria-controls={`panel${index}a-content`}
//                 id={`panel${index}a-header`}
//                 className={styles.question}
//               >
//                 <Typography>{question}</Typography>
//               </AccordionSummary>
//               <AccordionDetails className={styles.answer}>
//                 <Typography>{query[question]}</Typography>
//               </AccordionDetails>
//             </Accordion>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export { FAQs };

import styles from "./faqs.module.css";
import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FAQs = () => {
  const [faqs, setFaqs] = useState([]); // Default is an empty array

  useEffect(() => {
    fetch("https://qtify-backend-labs.crio.do/faq")
      .then((response) => response.json())
      .then((data) => {
        console.log("Raw API response:", data); // Debugging

        if (data.data && Array.isArray(data.data)) {
          setFaqs(data.data); // ✅ Correctly setting state
          console.log("FAQs updated:", data.data);
        } else {
          console.error("Unexpected API response format:", data);
          setFaqs(null);
        }
      })
      .catch((error) => {
        console.error("Error fetching FAQs:", error);
        setFaqs(null);
      });
  }, []);

  return (
    <div className={styles.FaqsWrapper}>
      <div className={styles.Faqs}>
        <h1>FAQs</h1>

        {faqs === null ? (
          <p> Failed to load FAQs. Please try again later.</p>
        ) : faqs.length > 0 ? (
          faqs.map((faq, index) => (
            <Accordion key={index} className={styles.accordion}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon className={styles.expandIcon} />}
                aria-controls={`panel${index}a-content`}
                id={`panel${index}a-header`}
                className={styles.question}
              >
                <Typography>{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails className={styles.answer}>
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <p>⏳ Loading FAQs...</p>
        )}
      </div>
    </div>
  );
};

export { FAQs };
