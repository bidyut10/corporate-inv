import React from "react";
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import { createPdfStyles } from "./pdfStylesFactory";

const InvoicePDFTemplate = ({ data }) => {
  const styles = createPdfStyles(data.theme);
  const subtotal =
    data.items?.reduce(
      (sum, item) => sum + (item.qty || 0) * (item.price || 0),
      0
    ) || 0;
  const tax = data.tax || 0;
  const total = subtotal + tax;
  const payment =
    data.payment?.map((item) => ({
      [item.label]: item.value,
    })) || [];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.invoiceTitle}>
            Invoice {data.invoiceNumber || ""}
          </Text>
        </View>

        <View style={styles.headerSection}>
          <View style={styles.headerDivider} />
          <View style={styles.headerLeft}>
            <View style={styles.headerRow}>
              <Text style={styles.headerLabel}>Serial Number</Text>
              <Text style={styles.headerValue}>{data.serialNumber || ""}</Text>
            </View>
            <View style={styles.headerRow}>
              <Text style={styles.headerLabel}>Date of Issue</Text>
              <Text style={styles.headerValue}>{data.issueDate || ""}</Text>
            </View>
            <View style={styles.headerRow}>
              <Text style={styles.headerLabel}>Due Date</Text>
              <Text style={styles.headerValue}>{data.dueDate || ""}</Text>
            </View>
            <View style={styles.headerRow}>
              <Text style={styles.headerLabel}>Currency</Text>
              <Text style={styles.headerValue}>{data.currency || ""}</Text>
            </View>
            {data.customFields?.basic?.map((field, index) => (
              <View key={index} style={styles.headerRow}>
                <Text style={styles.headerLabel}>{field.label}</Text>
                <Text style={styles.headerValue}>{field.value}</Text>
              </View>
            ))}
          </View>
          <View style={styles.headerRight}>
            {data.logoImage && <Image style={styles.logo} src={data.logoImage} />}
          </View>
        </View>

        <View style={styles.billingSection}>
          <View style={styles.billingDivider} />
          <View style={styles.billingColumn}>
            <Text style={styles.billingHeader}>From</Text>
            <Text style={styles.billingText}>{data.billedBy?.name || ""}</Text>
            <Text style={styles.billingText}>{data.billedBy?.contact || ""}</Text>
            <Text style={styles.billingText}>{data.billedBy?.address || ""}</Text>
            {data.customFields?.company?.length > 0 && (
              <View style={styles.customFieldsContainer}>
                {data.customFields.company.map((field, index) => (
                  <View key={index} style={styles.customField}>
                    <Text style={styles.customFieldLabel}>{field.label}</Text>
                    <Text style={styles.customFieldValue}>{field.value}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
          <View style={styles.billingColumn}>
            <Text style={styles.billingHeader}>To</Text>
            <Text style={styles.billingText}>{data.billedTo?.name || ""}</Text>
            <Text style={styles.billingText}>{data.billedTo?.contact || ""}</Text>
            <Text style={styles.billingText}>{data.billedTo?.address || ""}</Text>
            {data.customFields?.client?.length > 0 && (
              <View style={styles.customFieldsContainer}>
                {data.customFields.client.map((field, index) => (
                  <View key={index} style={styles.customField}>
                    <Text style={styles.customFieldLabel}>{field.label}</Text>
                    <Text style={styles.customFieldValue}>{field.value}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>

        <View style={styles.itemsContainer}>
          <View style={styles.itemsHeader}>
            <Text style={styles.itemsHeaderNo}>No.</Text>
            <Text style={styles.itemsHeaderItem}>Item</Text>
            <Text style={styles.itemsHeaderQty}>Quantity</Text>
            <Text style={styles.itemsHeaderPrice}>Price</Text>
            <Text style={styles.itemsHeaderTotal}>Total</Text>
          </View>
          {data.items?.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              <Text style={styles.itemNo}>{index + 1}.</Text>
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name || ""}</Text>
                <Text style={styles.itemDescription}>{item.description || ""}</Text>
              </View>
              <Text style={styles.itemQty}>{item.qty || 0}</Text>
              <Text style={styles.itemPrice}>
                {data.symbol || "$"} {(item.price || 0).toFixed(2)}
              </Text>
              <Text style={styles.itemTotal}>
                {data.symbol || "$"} {((item.qty || 0) * (item.price || 0)).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.calculationSection}>
          <View style={styles.calculationContainer}>
            <View style={styles.calculationRow}>
              <Text style={styles.calculationLabel}>Tax</Text>
              <Text style={styles.calculationValue}>
                {data.symbol || "$"} {tax.toFixed(2)}
              </Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>
                {data.symbol || "$"} {total.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.paymentSection}>
          <View style={styles.paymentDivider} />
          <View style={styles.paymentLeft}>
            <Text style={styles.paymentTitle}>Payment Information</Text>
            {payment.map((item, index) => {
              const [field, value] = Object.entries(item)[0];
              return (
                <View key={index} style={styles.paymentRow}>
                  <Text style={styles.paymentLabel}>{field}</Text>
                  <Text style={styles.paymentValue}>{value}</Text>
                </View>
              );
            })}
          </View>
          <View style={styles.paymentRight}>
            <View style={styles.signatureContainer}>
              {data.signatureImage && (
                <Image src={data.signatureImage} style={styles.signature} />
              )}
            </View>
            {data.signatureImage && (
              <View style={styles.signatureTextContainer}>
                <Text style={styles.signatureText}>{data.signatureText || ""}</Text>
              </View>
            )}
          </View>
        </View>

        {(data.termsSection?.title || data.termsSection?.text) && (
          <View style={styles.notesSection}>
            <Text style={styles.notesTitle}>{data.termsSection.title || ""}</Text>
            <Text style={styles.notesText}>{data.termsSection.text || ""}</Text>
          </View>
        )}

        {(data.thankyouSection?.title || data.thankyouSection?.text) && (
          <View style={styles.thankYouSection}>
            <Text style={styles.thankYouTitle}>{data.thankyouSection.title || ""}</Text>
            <Text style={styles.thankYouText}>{data.thankyouSection.text || ""}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default InvoicePDFTemplate;
