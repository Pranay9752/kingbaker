import React, { useState } from "react";
import TopNavbar from "../../molecules/header/TopNavBar";
import SEO from "../../atom/seo/SEO";

const POLICY_DATA = {
  lastUpdated: "April 2, 2025",
  introduction:
    "Jojo Cart is committed to safeguarding your personal information and ensuring a secure and seamless shopping experience. We may update this Privacy Policy periodically without prior notice. Please review this page regularly to stay informed of any changes.",
  sections: [
    {
      title: "Collection of Information",
      content: [
        {
          type: "text",
          content:
            "We collect and store personal information provided by you during your interaction with our website. This includes but is not limited to:",
        },
        {
          type: "list",
          items: [
            "Name, email address, contact number, and postal address.",
            "Payment details for order processing (excluding sensitive financial information).",
            "Purchase history, preferences, and browsing behavior to enhance user experience.",
            "Correspondence (emails, messages, or support requests) for service improvements.",
          ],
        },
      ],
    },
    {
      title: "Use of Collected Information",
      content: [
        {
          type: "text",
          content: "We use your data to:",
        },
        {
          type: "checklist",
          items: [
            "Process your orders efficiently and ensure timely delivery.",
            "Personalize your shopping experience and recommend relevant products.",
            "Communicate with you regarding offers, promotions, and service updates.",
            "Improve our website functionality and security.",
            "Prevent fraud, unauthorized access, and other unlawful activities.",
          ],
        },
      ],
    },
    {
      title: "Communication & Marketing",
      content: [
        {
          type: "text",
          content:
            "We may send promotional emails, newsletters, or exclusive offers based on your preferences. You can opt-out anytime by unsubscribing from our emails or contacting our support team.",
        },
      ],
    },
    {
      title: "Security Measures",
      content: [
        {
          type: "text",
          content:
            "Your data security is our priority. We adopt industry-standard security measures to protect your personal information from unauthorized access or misuse. While we do not collect highly sensitive financial data, we ensure secure payment processing through trusted third-party payment gateways.",
        },
      ],
    },
    {
      title: "Cookies & Tracking Technologies",
      content: [
        {
          type: "text",
          content: "We use cookies to enhance your browsing experience by:",
        },
        {
          type: "list",
          items: [
            "Remembering your login details and preferences.",
            "Analyzing website traffic for performance improvements.",
            "Displaying relevant advertisements based on your interests.",
          ],
        },
        {
          type: "text",
          content:
            "You can modify your cookie settings in your browser anytime.",
        },
      ],
    },
    {
      title: "Sharing of Information",
      content: [
        {
          type: "text",
          content:
            "We DO NOT sell or rent your personal data to third parties. However, we may share your information with:",
        },
        {
          type: "list",
          items: [
            "Partnered service providers for order fulfillment, delivery, and customer support.",
            "Law enforcement agencies when required by law or to prevent fraudulent activities.",
            "Affiliated companies to improve and expand our services (only with your consent).",
          ],
        },
      ],
    },
    {
      title: "Third-Party Links & Advertisements",
      content: [
        {
          type: "text",
          content:
            "Jojo Cart may contain links to external websites. Please note that we are not responsible for their privacy practices.",
        },
      ],
    },
    {
      title: "Business Transfers",
      content: [
        {
          type: "text",
          content:
            "In case of a merger, acquisition, or business transition, your personal information may be transferred as part of company assets. You will be notified of any such changes.",
        },
      ],
    },
    {
      title: "Policy Updates & Contact Information",
      content: [
        {
          type: "text",
          content:
            "We reserve the right to modify this policy at any time. Major updates will be communicated via email or website announcements.",
        },
        {
          type: "text",
          content:
            "For any privacy concerns, you can contact our Grievance Officer:",
        },
      ],
      contactInfo: {
        email: "support@kingbakers.in",
        name: "Mr. Udit",
      },
    },
    {
      title: "Hassle-Free Returns & Customer Commitment",
      content: [
        {
          type: "text",
          content:
            "We sincerely appreciate your trust in Jojo Cart and for allowing us to be part of your joyous moments. Our passion lies in making your celebrations extra special, and we take pride in delivering gifts that bring smiles. At Jojo Cart, we are a team of celebration enthusiasts dedicated to curating the perfect gifting experience. We work diligently to ensure that every product on our website reaches you with the promised quality and care.",
        },
      ],
    },
    {
      title: "Term and Conditions",
      content: [
        {
          type: "text",
          content: `Welcome to Jojo Cart! Please carefully review the following terms and conditions, as they govern your use of our website and services.
By accessing, subscribing to, or using any of our services, you acknowledge that you have read, understood, and agreed to abide by these terms. If you do not agree, we kindly ask that you refrain from using our services.
Your use of the Jojo Cart website, including any transactions and interactions, is subject to these Terms of Use, along with all related policies referenced herein`,
        },
        {
          type: "checklist",
          items: [
            "The website www.jojocart.com (Website) is an internet-based content and e-commerce platform owned and operated by Jojo Cart, a company incorporated under the laws of India.",
            "Your use of the Website is subject to acceptance, without modification, of all the terms, conditions, and notices outlined herein. Jojo Cart reserves the right to refuse registration or access to any user at its sole discretion without",
          ],
        },
        {
          type: "text",
          content: "Headings:",
        },
        {
          type: "text",
          content:
            "Headings and subheadings are included for convenience and reference only. They do not limit, define, or interpret the scope or intent of these Terms and Conditions.",
        },
        {
          type: "text",
          content: "User Account, Password, and Security:",
        },
        {
          type: "list",
          items: [
            `Upon completing the registration process, you will receive an account designation and password.`,
            `You are responsible for maintaining the confidentiality of your account credentials and for all activities occurring under your account.`,
            `You agree to: a) Notify Jojo Cart immediately of any unauthorized use or security breach. b) Log out at the end of each session to prevent unauthorized access.`,
            `Jojo Cart is not responsible for any loss or damage arising from your failure to comply with these security measures.`,
            `If we find any information provided by you to be inconsistent, inaccurate, outdated, or incomplete, we reserve the right to suspend or terminate your account.`,
          ],
        },
        {
          type: "text",
          content: "Communications:",
        },
        {
          type: "text",
          content:
            "By using the Website or communicating electronically with Jojo Cart, you consent to receive communications from us via electronic records, including but not limited to emails and notifications.",
        },
        {
          type: "text",
          content: "Services Offered:",
        },
        {
          type: "text",
          content:
            "Jojo Cart provides internet-based services that allow users to purchase original merchandise, including but not limited to watches, perfumes, sunglasses, belts, and other gift items. Once an order is placed, Jojo Cart will ship the pro",
        },
        {
          type: "text",
          content: "Use of the Website:",
        },
        {
          type: "text",
          content:
            "By using the Website, you agree to comply with the following binding principles:",
        },
        {
          type: "text",
          content: "Charges:",
        },
        {
          type: "list",
          items: [
            ` Jojo Cart offers free membership for buyers. Browsing and purchasing products do not incur any charges.`,
            `Jojo Cart reserves the right to change its fee policy at any time. New services may introduce additional fees, and existing services may be modified with or without charge.`,
            `Any changes to the fee policy will be posted on the Website and become effective immediately.`,
            `Fees are quoted in Indian Rupees unless otherwise specified.`,
            `Users are responsible for complying with applicable payment laws in India when making payments to Dhawala Online Solutions Private Limited.`,
          ],
        },
        {
          type: "text",
          content: "Privacy Policy:",
        },
        {
          type: "text",
          content:
            "By using this Website, you acknowledge that you have read, understood, and agreed to the Jojo Cart Privacy Policy.",
        },
        {
          type: "text",
          content: "Limited User:",
        },
        {
          type: "list",
          items: [
            `Users must not modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any information or software obtained from the Website.`,
            `Limited reproduction and copying of content from the Website is allowed, provided that Jojo Cart is credited as the source and written permission is obtained beforehand.`,
            `Unauthorized commercial or wholesale reproduction, modification, or distribution of Website content is strictly prohibited.`,
            `For any further clarifications, please contact Jojo Cart customer support. Thank you for using our services!`,
          ],
        },
      ],
    },
    {
      title: "User Conduct and Rules",
      content: [
        {
          type: "text",
          content:
            "You agree and undertake to use the Website and the Service only to post and upload messages and material that are proper. By way of example, and not as a limitation, you agree and undertake that when using a Service, you will not:",
        },
        {
          type: "list",
          items: [
            "Defame, abuse, harass, stalk, threaten or otherwise violate the legal rights of others",
            "Publish, post, upload, distribute or disseminate any inappropriate, profane, defamatory, infringing, obscene, indecent or unlawful topic, name, material or information",
            "Upload files that contain software or other material protected by intellectual property laws unless you own or control the rights thereto or have received all necessary consents",
            "Upload or distribute files that contain viruses, corrupted files, or any other similar software or programs that may damage the operation of the Website or another's computer",
            "Conduct or forward surveys, contests, pyramid schemes or chain letters",
            "Download any file posted by another user of a Service that you know, or reasonably should know, cannot be legally distributed in such manner",
            "Falsify or delete any author attributions, legal or other proper notices or proprietary designations or labels of the origin or source of software or other material contained in a file that is uploaded",
            "Violate any code of conduct or other guidelines, which may be applicable for or to any particular Service",
            "Violate any applicable laws or regulations for the time being in force in or outside India",
            "Violate any of the terms and conditions of this Agreement or any other terms and conditions for the use of the Website contained elsewhere herein",
          ],
        },
      ],
    },
    {
      title: "Contents Posted on Site",
      content: [
        {
          type: "text",
          content:
            "Except as expressly provided in these Terms of Use, no part of the Website and no Content may be copied, reproduced, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted or distributed in any way. You may use information on the products and services purposely made available on the Website for downloading, provided that You:",
        },
        {
          type: "checklist",
          items: [
            "Do not remove any proprietary notice language in all copies of such documents",
            "Use such information only for your personal, non-commercial informational purpose and do not copy or post such information on any networked computer or broadcast it in any media",
            "Make no modifications to any such information",
            "Do not make any additional representations or warranties relating to such documents",
          ],
        },
      ],
    },
    {
      title: "Intellectual Property Rights",
      content: [
        {
          type: "text",
          content:
            "Unless otherwise indicated or anything contained to the contrary or any proprietary material owned by a third party and so expressly mentioned, jojocart.com owns all Intellectual Property Rights to and into the Website. Notwithstanding the foregoing, it is expressly clarified that you will retain ownership and shall solely be responsible for any content that you provide or upload when using any Service.",
        },
      ],
    },
    {
      title: "Links To Third Party Sites",
      content: [
        {
          type: "text",
          content:
            "The Website may contain links to other websites ('Linked Sites'). The Linked Sites are not under the control of jojocart.com or the Website and jojocart.com is not responsible for the contents of any Linked Site, including without limitation any link contained in a Linked Site.",
        },
      ],
    },
    {
      title: "Disclaimer Of Warranties/Limitation Of Liability",
      content: [
        {
          type: "text",
          content:
            "Jojocart.com has endeavored to ensure that all the information on the Website is correct, but Jojocart.com neither warrants nor makes any representations regarding the quality, accuracy or completeness of any data, information, product or Service. This Website, all the materials and products and services are provided on 'as is' and 'as available' basis without any representations or warranties.",
        },
        {
          type: "list",
          items: [
            "This Website will be constantly available, or available at all",
            "The information on this Website is complete, true, accurate or non-misleading",
          ],
        },
        {
          type: "text",
          content:
            "Jojo cart will not be liable to you in any way or in relation to the Contents of, or use of, or otherwise in connection with, the Website. You will be required to enter a valid phone number while placing an order on the Website. By registering your phone number with us, You consent to be contacted by us via phone calls and/or SMS notifications.",
        },
      ],
    },
    {
      title: "Indemnification",
      content: [
        {
          type: "text",
          content:
            "You agree to indemnify, defend and hold harmless Jojocart.com from and against any and all losses, liabilities, claims, damages, costs and expenses (including legal fees and disbursements in connection therewith and interest chargeable thereon) asserted against or incurred by Jojocart.com that arise out of, result from, or may be payable by virtue of, any breach or non-performance of any representation, warranty, covenant or agreement made or obligation to be performed by you pursuant to these Terms.",
        },
      ],
    },
    {
      title: "Termination",
      content: [
        {
          type: "text",
          content:
            "Jojocart.com may suspend or terminate your use of the Website or any Service if it believes, in its sole and absolute discretion that you have breached a term of these Terms. If you or Jojocart.com terminates your use of the Website or any Service, Jojocart.com may delete any content or other materials relating to your use of the Service and Jojocart.com will have no liability to you or any third party for doing so. You shall be liable to pay for any Service or product that you have already ordered till the time of Termination by either party whatsoever.",
        },
      ],
    },
    {
      title: "Governing Law",
      content: [
        {
          type: "text",
          content:
            "These terms shall be governed by and constructed in accordance with the laws of India without reference to conflict of laws principles and disputes arising in relation hereto shall be subject to the exclusive jurisdiction of the courts at Delhi, India.",
        },
      ],
    },
    {
      title: "Report Abuse",
      content: [
        {
          type: "text",
          content:
            "As per these Terms, users are solely responsible for every material or content uploaded on to the Website. Jojocart.com does not review the contents in any way before they appear on the Website. Jojocart.com does not verify, endorse or otherwise vouch for the contents of any user or any content generally posted or uploaded on the Website.",
        },
      ],
      contactInfo: {
        email: "support@kingbakers.in",
        name: "Mr. Udit",
      },
    },
    {
      title: "Product Description",
      content: [
        {
          type: "text",
          content:
            "Jojo cart we do not warrant that Product description or other content of this Website is accurate, complete, reliable, current, or error-free and assumes no liability in this regard.",
        },
      ],
    },
    {
      title: "Limitation of Liability",
      content: [
        {
          type: "text",
          content:
            "IN NO EVENT SHALL JOJO CART BE LIABLE FOR ANY SPECIAL, INCIDENTAL, INDIRECT OR CONSEQUENTIAL DAMAGES OF ANY KIND IN CONNECTION WITH THESE TERMS OF USE, EVEN IF USER HAS BEEN INFORMED OF THE POSSIBILITY OF SUCH DAMAGES.",
        },
      ],
    },
    {
      title: "Pricing",
      content: [
        {
          type: "text",
          content:
            "Prices for products are described on our Website and are incorporated into these Terms by reference. All prices are in Indian rupees. Prices, products and Services may change at Jojo cart's discretion.",
        },
      ],
    },
    {
      title: "Payment",
      content: [
        {
          type: "text",
          content:
            "While availing any of the payment method/s available on the Website, we will not be responsible or assume any liability, whatsoever in respect of any loss or damage arising directly or indirectly to you due to:",
        },
        {
          type: "list",
          items: [
            "Lack of authorization for any transaction/s",
            'Exceeding the preset limit mutually agreed by you and between your "Bank/s"',
            "Any payment issues arising out of the transaction",
            "Decline of transaction for any other reason/s",
          ],
        },
        {
          type: "text",
          content:
            "All payments made against the purchases/services on Website by you shall be compulsorily in Indian Rupees acceptable in the Republic of India. Website will not facilitate transaction with respect to any other form of currency.",
        },
      ],
    },
    {
      title: "Acceptance of orders",
      content: [
        {
          type: "text",
          content:
            "The orders are accepted via website, Android app, IOs app. Only in case of special requirements we accept orders on mail and Customer care phone.",
        },
      ],
    },
    {
      title: "Exactness Not Guaranteed",
      content: [
        {
          type: "text",
          content:
            "Jojocart.com hereby disclaims any guarantees of exactness as to the finish and appearance of the final Product as delivered to the recipient. We DO NOT guarantee delivery of the exact replica of the products mentioned on the website.",
        },
        {
          type: "list",
          items: [
            "In Case of flower related products - the florists use different wrapping paper, baskets, decoration material, so the arrangements shown in website look little different from actual products delivered.",
            "In case of cakes - the bakeries use the pictures as guidelines but they have their own style of preparing same flavored cakes. Therefore the cakes though are same flavoured might look different.",
            "In case of any other products, if we cannot deliver same products due to unavoidable circumstances, we will deliver similar product of same monetary value.",
          ],
        },
      ],
    },
    {
      title: "Products and services delivery - Date and Time slots",
      content: [
        {
          type: "text",
          content:
            "The time slots provided at the time of checkout can be selected by user. These are preferred date and time slots of customer. We strive to do deliveries on the selected date and time slot but it is NOT A GUARANTEE. We are committed to deliver within the day of delivery.",
        },
        {
          type: "list",
          items: [
            "For day time delivery, delivery time ranges from 10 AM to 8 PM",
            "For midnight orders, delivery could be made anytime between 11:00 PM to 11:59 PM.",
            "In case of remote locations/small towns it can be made from 10PM to 12:30 AM.",
          ],
        },
        {
          type: "text",
          content:
            "No refund will be made in case orders fail to be delivered within provided time slot. Only one attempt for delivery will be made. Please confirm availability of recipient before choosing delivery time. If recipient is not available at the time of delivery, second attempt will not be made and order will be cancelled. No refund will be made in this case.",
        },
        {
          type: "text",
          content:
            "Delivery timings, if promised cannot be guaranteed in case of special circumstances like extreme weather conditions, riots, strikes, elections, bandhs, during rush days like Valentine's Day, Mother's Day, Rakhi, New year Eve etc.",
        },
        {
          type: "text",
          content:
            "Special day deliveries are processed until 52 hours of requested delivery date and time slots. Special days for Jojo cart are - Mother's day, Father's Day, Diwali, Holi, Valentine's Day, Rose day, Teddy day, Proposal Day, Hug day, Kiss Day, Friendship Day, Raksha Bandhan, Christmas and New Year.",
        },
      ],
    },
    {
      title: "Delivery",
      content: [
        {
          type: "text",
          content:
            "Title and risk of loss for all products ordered by you shall pass on to you upon Jojo cart's shipment. Thereafter Jojo cart will not be responsible for any loss or damage to the product.",
        },
        {
          type: "text",
          content: "If recipient receives the products in damaged condition:",
        },
        {
          type: "checklist",
          items: [
            "Recipient should check the products delivered (cakes, flowers, any other) before signing the receipt.",
            "If product delivered found damaged, recipient should refuse to accept it and immediately inform Customer Care.",
            "Any issues with the products delivered should be reported within 4 hours of receipt, after that no request of replacement or refund will be entertained.",
            "In case of badly damaged products, replacement will be provided. Kindly allow a minimum of 6 hours for the replacement.",
            "Courier product complaints should be informed within 48 hours after delivery. Complaints coming after 48 hours will not be undertaken.",
          ],
        },
        {
          type: "text",
          content:
            "Minimalistic and cosmetic damages like - Name/message on cake not written, Name and message not attached with flowers, Cream of cake/decoration on cake/flowers packaging issues - will not be eligible for refunds/replacements until unless they are severely damaged.",
        },
      ],
    },
    {
      title: "Keep as surprise",
      content: [
        {
          type: "text",
          content:
            "For orders where Keep as Surprise is selected we will deliver the order as requested without receiver knowing the sender's detail. In case the receiver refuses to accept the order then we will disclose the sender's details for the order to be delivered.",
        },
      ],
    },
    {
      title: "Contact Us",
      content: [
        {
          type: "text",
          content:
            "Please send any questions or comments (including all inquiries unrelated to copyright infringement) regarding this Website to:",
        },
        {
          type: "list",
          items: [
            `Non delivery of products`,
            `We will be able to attempt delivery of your order only once. For perishable products, delivery attempt can be made again subject to our decision and you may be liable for additional delivery charge in such cases. In the event the de Wrong shipping/delivery address.`,
            `Premises locked. Wrong landlines / Mobile number or Extension number which may render us unable to reach the recipient for the delivery.`,
            `Recipient refusing to accept the delivery.`,
            `Delivered the product at the Gate / Neighbor as per instruction given by receiver.`,
            `Recipient not available.`,
          ],
        },
      ],
      contactInfo: {
        email: "support@kingbakers.in",
        name: "Mr. Udit",
        phone: "+91 - 7217250250",
        hours: "Available between 8 AM - 11 PM",
      },
    },
    {
      title: "Cancellation Policy",
      content: [
        {
          type: "text",
          content:
            "Please read the below stated points for any cancellations. Please understand that the points mentioned in the policies are with reference to the time slots on the www.jojocart.com website selected by the user in checkout process. Orders are processed in time slots and we accept cancellation requests with reference to time slot selected by customer in order placed.",
        },
        {
          type: "list",
          items: [
            "If the cancellation request comes to Jojo cart before 24 hours to the start of time slot selected - 10% of order value is charged as cancellation charges. 90% refund to Bank Account. NOTE - 100% refund can be requested in Jojo cart wallet.",
            "If the cancellation request comes to Jojo cart between 12 - 24 hours before the start of time slot selected then - 20% of order value will be deducted as cancellation charges. 80% refund to Bank Account. NOTE - 100% refund can be requested in Jojo cart wallet.",
            "If cancellation is request comes to Jojo cart within 12 hours to the start of time slot selected - 100% of order value will be deducted as cancellation charges. 0% refund to Bank account or 0% to Jojo cart wallet applicable.",
          ],
        },
        {
          type: "text",
          content:
            "In any of the cases above Wallet refunds and Bank refunds can be initiated only at the discretion of company considering the reasons of cancellation like unfortunate events, calamities or unavoidable circumstances. No claims to refund can be made.",
        },
        {
          type: "text",
          content:
            "NO cancellation requests are accepted on order placed in following categories:",
        },
        {
          type: "checklist",
          items: [
            "Same day delivery category - If your date of placing an order and delivery date of that order are same, we do not accept cancellation request. If you cancel it, or receiver does not receive it - you are not entitled to any refund.",
            "Same day mid-night delivery orders can not be cancelled.",
            "Special day orders can not be cancelled and no refund is initiated for them.",
          ],
        },
      ],
    },
    {
      title: "Same day Orders",
      content: [
        {
          type: "text",
          content:
            "We allow users to select the same date of delivery on which he/she is placing the order i.e. order delivery and order placed date is same. We attempt to do same day delivery of the requested products but DO NOT PROMISE so. We will process same day delivery orders within 24 hours of requested date and time slot.",
        },
        {
          type: "list",
          items: [
            "Jojo cart takes same day orders for day and evening time slots till 5 pm. It is attempt to do same day delivery and not a promise, though we make our 100% effort to deliver on the same date as order placed.",
            "Jojo cart takes order for same day mid-night (00:00) delivery till 7:00 pm. It is attempt to do same day mid-night delivery and not a promise, though we make our 100% effort to deliver on the same date as order placed.",
          ],
        },
      ],
    },
    {
      title: "Refund Policy",
      content: [
        {
          type: "text",
          content:
            "Refund in cases of Cancellations are mentioned in Cancellation policy, kindly refer the same.",
        },
        {
          type: "list",
          items: [
            "The acceptance of order is subject to availability of products, delivery areas and time. The order may or may not be accepted. The order might be cancelled after assessing the circumstances and communicated to customer. In such case, full refund will be initiated.",
            "Only one attempt for delivery will be made. Please confirm availability of recipient before choosing delivery time. If recipient is not available at the time of delivery, second attempt will not be made and order will be cancelled. No refund will be made in this case.",
            "The refunds are only initiated once the customer confirms over mail that where the refund has to be done - Jojo cart wallet or bank account.",
            "Refund will be credited in Jojo cart Wallet on orders which are processing within 48 hours of delivery date",
            "Refunds are processed to your payment method within 15 working days.",
          ],
        },
      ],
    },
    {
      title: "Address Change requests",
      content: [
        {
          type: "text",
          content:
            "Change in the address is permitted free of cost only before 24 hours of delivery. Within 24 hours period before delivery, if address is changed we charge Rs 200/-. Sometimes the address change request can not be accepted, in that case order will not be refunded or cancelled.",
        },
      ],
    },
    {
      title: "Pincode Requirements",
      content: [
        {
          type: "text",
          content:
            "It is user responsibility to provide correct pincode in the address of delivery. The pin code should map to the correct delivery address. Sometimes address mentioned does not correspond to the the pin code of that area.",
        },
        {
          type: "text",
          content:
            "If pin code entered in the address section is incorrect then following cases arise:",
        },
        {
          type: "list",
          items: [
            "Address entered is of Non-Serviceable area, the order stands cancelled and NO refund will be initiated - The system checks pincode for delivery verification and may accept order when pincode entered is of serviceable area and address entered is not.",
            "If our team contacts you regarding wrong pin in address, and you want to get delivery done to new pin code, the charges of the newly added pin code will apply. The order can not be cancelled and refunded in case you do not wish to change pincode.",
          ],
        },
      ],
    },
    {
      title: "Important Points",
      content: [
        {
          type: "text",
          content:
            "The products and services displayed on Jojo cart are our best offerings and we put in our 100% effort to deliver high quality similar products and services. These terms and conditions are put across to avoid any possible conflict.",
        },
        {
          type: "checklist",
          items: [
            "All products listed on the website, their descriptions, and their prices are subject to change, time to time according to the various conditions prevailing in the market.",
            "Orders are accepted and delivered in TIME SLOTS which are available in your selected city. All requests are processed with reference to time slot of your order.",
            "For midnight orders, delivery could be made anytime between 11:00 PM to 12:30 AM. In case of remote locations/small towns it can be made from 10PM to 12:30 AM.",
            "Jojo cart reserves the right, to modify, suspend, or discontinue the sale of any product or services with or without prior notice at any time.",
            "The product specifications (weight, size, colour etc.) mentioned with the product photos displayed are only approximate and indicative. There may be a slight variation in the pictures and the products delivered.",
            "The acceptance of order is subject to availability of products, delivery areas and time. The order may or may not be accepted.",
            "In case we detect fraudulent behaviour, we are liable to cancel the order at our discretion and we will not be refund money in such cases.",
            "If the duplicate order with the similar details are placed, we will try to contact the customer, and in case of no response from the customer, we will process both the order.",
            "There is no guarantee of delivery of the products in the time slots mentioned on website in case of midnight delivery on special occasions.",
            "There is no cancellation for orders placed under the 'Same Day Delivery' category.",
            "Only one attempt for delivery will be made. Please confirm availability of recipient before choosing delivery time.",
            "For rescheduling order, you need to inform us at-least 24 hours before delivery date.",
            "Recipient should check the order before signing the receipt, If found damaged, recipient should refuse to accept the order.",
            "Execution of the order will be considered successful and complete in cases like Wrong Address mentioned by sender, premises where delivery has to be made is locked, recipient of order is not available, and recipient has refused to accept the order.",
            "Execution of the order will be considered successful and complete in case of permission not granted to our delivery executive to enter the delivery location.",
            "Delivery timings, if promised cannot be guaranteed in case of special circumstances like extreme weather conditions, riots, strikes, elections, bandhs, during rush days.",
          ],
        },
        {
          type: "text",
          content:
            "In case you feel that the product received does not meet your expectations, you must bring it to the notice of our customer service within 4 hours of receiving the product. The Customer Service Team after looking into your complaint will take an appropriate decision.",
        },
      ],
    },
  ],
};

const PrivacyPolicySection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mb-6 border border-gray-200 rounded-lg shadow-sm overflow-auto bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex justify-between items-center bg-gradient-to-r from-orange-100 to-white hover:from-orange-200 transition-all duration-300"
      >
        <h3 className="text-lg font-medium text-gray-800">{title}</h3>
        <span
          className={`text-orange-500 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      </button>
      <div
        className={`px-6 overflow-auto transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen py-4" : "max-h-0 py-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

const PrivacyPolicy = ({}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <TopNavbar
        logo="/path/to/your/logo.png"
        title="logo"
        searchPlaceholder="Search flowers, cakes, gifts, etc."
        currencies={["INR", "USD", "EUR"]}
        deliveryLocationText="Select Delivery Location"
        franchiseEnquiriesText="Franchise Enquiries"
        corporateGiftsText="Corporate Gifts"
        moreOptions={[
          { label: "About Us", link: "/about" },
          { label: "Contact", link: "/contact" },
          { label: "FAQ", link: "/faq" },
        ]}
        userGreeting="Hi Guest"
      />
      <SEO title={"Privacy Policy"} />
      <div className="max-w-4xl mx-auto pt-12 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600">
            Last updated: {POLICY_DATA.lastUpdated || "April 2, 2025"}
          </p>
          <div className="mt-6 flex justify-center">
            <div className="h-1 w-20 bg-orange-500 rounded-full"></div>
            <div className="h-1 w-20 mx-2 bg-[#7e8036] rounded-full"></div>
            <div className="h-1 w-20 bg-orange-500 rounded-full"></div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-10 border-l-4 border-[#7e8036]">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Introduction
          </h2>
          <p className="text-gray-600">{POLICY_DATA.introduction}</p>
        </div>

        {POLICY_DATA.sections.map((section, index) => (
          <PrivacyPolicySection key={index} title={section.title}>
            {section.content.map((paragraph, pIndex) => (
              <div key={pIndex} className="mb-4">
                {paragraph.type === "text" && (
                  <p className="text-gray-600">{paragraph.content}</p>
                )}
                {paragraph.type === "list" && (
                  <ul className="list-disc pl-5 text-gray-600 space-y-2 mt-2">
                    {paragraph.items.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                )}
                {paragraph.type === "checklist" && (
                  <ul className="space-y-2 mt-2">
                    {paragraph.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <span className="text-orange-500 mr-2 mt-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 6L9 17l-5-5"></path>
                          </svg>
                        </span>
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            {section.contactInfo && (
              <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-100">
                <h4 className="font-medium text-gray-800 mb-2">
                  Contact Information:
                </h4>
                {section.contactInfo.email && (
                  <p className="text-gray-600">
                    <span className="font-medium">Email:</span>{" "}
                    {section.contactInfo.email}
                  </p>
                )}
                {section.contactInfo.name && (
                  <p className="text-gray-600">
                    <span className="font-medium">Name:</span>{" "}
                    {section.contactInfo.name}
                  </p>
                )}
              </div>
            )}
          </PrivacyPolicySection>
        ))}

        {/* <div className="mt-12 text-center">
          <button className="px-8 py-3 bg-[#7e8036] hover:bg-[#686c2d] text-white font-medium rounded-lg shadow-sm transition-colors duration-300 mx-2">
            Accept All
          </button>
          <button className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg shadow-sm transition-colors duration-300 mx-2">
            Customize Settings
          </button>
        </div> */}

        <div className="mt-16 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Jojo Cart. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
