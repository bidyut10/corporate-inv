import React from "react";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { flexDirection: "column", backgroundColor: "#ffffff", padding: 24, fontFamily: "Helvetica", fontSize: 14, lineHeight: 1.4, color: "#404040" },
  invoiceTitle: { fontSize: 20, fontWeight: "normal", textTransform: "uppercase", color: "#262626", marginBottom: 16, textAlign: "left" },
  headerSection: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderTopWidth: 1, borderBottomWidth: 1, borderStyle: "dashed", borderColor: "#f5f5f5", paddingTop: 12, paddingBottom: 4, position: "relative" },
  headerDivider: { position: "absolute", left: "50%", top: 0, bottom: 0, borderLeftWidth: 1, borderStyle: "dashed", borderColor: "#f5f5f5" },
  headerLeft: { width: "48%", paddingRight: 6, fontSize: 11 },
  headerRight: { width: "48%", alignItems: "flex-end", justifyContent: "center", paddingLeft: 6 },
  headerRow: { flexDirection: "row", justifyContent: "space-between", marginVertical: 1 },
  headerLabel: { color: "#000000", fontSize: 11 },
  headerValue: { color: "#404040", fontSize: 11, marginLeft: 8 },
  logo: { maxHeight: 60, objectFit: "contain" },
  billingSection: { flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderStyle: "dashed", borderColor: "#f5f5f5", marginBottom: 16, paddingTop: 12, paddingBottom: 4, position: "relative" },
  billingDivider: { position: "absolute", left: "50%", top: 0, bottom: 0, borderLeftWidth: 1, borderStyle: "dashed", borderColor: "#f5f5f5" },
  billingColumn: { width: "48%" },
  billingHeader: { fontSize: 11, fontWeight: 500, color: "#262626", marginBottom: 4 },
  billingText: { fontSize: 11, color: "#525252", lineHeight: 1.5, marginBottom: 4 },
  customFieldsContainer: { marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderStyle: "dashed", borderColor: "#fafafa" },
  customField: { flexDirection: "row", justifyContent: "space-between", marginVertical: 1 },
  customFieldLabel: { fontSize: 11, fontWeight: 500, color: "#404040" },
  customFieldValue: { fontSize: 11, color: "#404040", marginLeft: 8 },
  itemsContainer: {},
  itemsHeader: { flexDirection: "row", backgroundColor: "#fafafa", fontSize: 11, fontWeight: 500, paddingTop: 6, paddingHorizontal: 8, color: "#262626", marginBottom: 2, borderRadius: 4 },
  itemsHeaderNo: { width: "8%", textAlign: "left" },
  itemsHeaderItem: { width: "40%" },
  itemsHeaderQty: { width: "8%", textAlign: "center" },
  itemsHeaderPrice: { width: "22%", textAlign: "right" },
  itemsHeaderTotal: { width: "22%", textAlign: "right" },
  itemRow: { flexDirection: "row", borderBottomWidth: 1, borderStyle: "dashed", borderColor: "#f5f5f5", paddingVertical: 8, paddingHorizontal: 8, alignItems: "flex-start" },
  itemNo: { width: "8%", fontSize: 10, color: "#525252", paddingTop: 2 },
  itemDetails: { width: "40%", paddingHorizontal: 2 },
  itemName: { fontSize: 11, fontWeight: 500, color: "#525252", marginBottom: 2 },
  itemDescription: { fontSize: 10, color: "#525252", lineHeight: 1 },
  itemQty: { width: "8%", fontSize: 10, color: "#525252", textAlign: "center", paddingTop: 2 },
  itemPrice: { width: "22%", fontSize: 10, color: "#525252", textAlign: "right", paddingTop: 2 },
  itemTotal: { width: "22%", fontSize: 10, color: "#525252", textAlign: "right", paddingTop: 2 },
  calculationSection: { flexDirection: "row", justifyContent: "flex-end", alignItems: "center", width: "100%", marginBottom: 12 },
  calculationContainer: { width: "40%" },
  calculationRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 4, borderBottomWidth: 1, borderStyle: "dashed", borderColor: "#fafafa" },
  calculationLabel: { fontSize: 11, color: "#404040" },
  calculationValue: { fontSize: 11, color: "#404040", paddingRight: 8 },
  totalRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 8, borderBottomWidth: 1, borderStyle: "dashed", borderColor: "#fafafa" },
  totalLabel: { fontSize: 14, fontWeight: 500, color: "#404040" },
  totalValue: { fontSize: 14, fontWeight: 500, color: "#404040", paddingRight: 8 },
  paymentSection: { flexDirection: "row", justifyContent: "flex-start", alignItems: "stretch", width: "100%", borderTopWidth: 1, borderBottomWidth: 1, borderStyle: "dashed", borderColor: "#f5f5f5", marginBottom: 16, marginTop: 4, position: "relative" },
  paymentDivider: { position: "absolute", left: "50%", top: 0, bottom: 0, borderLeftWidth: 1, borderStyle: "dashed", borderColor: "#f5f5f5" },
  paymentLeft: { width: "48%", paddingTop: 12, paddingBottom: 4, paddingRight: 6 },
  paymentRight: { width: "48%", paddingTop: 12, paddingBottom: 4, paddingLeft: 12, alignItems: "center", justifyContent: "center", flexDirection: "column" },
  paymentTitle: { fontSize: 11, color: "#262626", fontWeight: 500, marginBottom: 6 },
  paymentRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 1 },
  paymentLabel: { fontSize: 11, color: "#525252" },
  paymentValue: { fontSize: 11, color: "#525252" },
  signatureContainer: { width: "100%", height: 60, paddingTop: 8, justifyContent: "center", alignItems: "center", flex: 1 },
  signature: { maxHeight: 40, maxWidth: 100, objectFit: "contain" },
  signatureTextContainer: { width: "100%", height: 24, justifyContent: "center", alignItems: "center" },
  signatureText: { fontSize: 10, color: "#525252", backgroundColor: "#fafafa", paddingVertical: 4, paddingHorizontal: 8, textAlign: "center", width: "100%" },
  notesSection: { width: "100%", borderTopWidth: 1, borderBottomWidth: 1, borderStyle: "dashed", borderColor: "#f5f5f5", backgroundColor: "#fafafa", paddingVertical: 12, paddingHorizontal: 12, marginBottom: 16 },
  notesTitle: { color: "#262626", fontWeight: 500, fontSize: 11, marginBottom: 2 },
  notesText: { color: "#525252", fontSize: 10, lineHeight: 1 },
  thankYouSection: { width: "100%", borderTopWidth: 1, borderBottomWidth: 1, borderStyle: "dashed", borderColor: "#f5f5f5", backgroundColor: "#fafafa", paddingVertical: 12, paddingHorizontal: 12, textAlign: "center" },
  thankYouTitle: { color: "#262626", fontWeight: 500, fontSize: 11, marginBottom: 2, textAlign: "center" },
  thankYouText: { color: "#525252", fontSize: 10, textAlign: "center" },
});

const ReceiptPDFTemplate = ({ data }) => {
  const subtotal = data.items?.reduce((sum, item) => sum + (item.qty || 0) * (item.price || 0), 0) || 0;
  const tax = data.tax || 0;
  const total = subtotal + tax;
  const payment = data.payment?.map((item) => ({ [item.label]: item.value })) || [];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.invoiceTitle}>Receipt {data.receiptNumber || data.invoiceNumber || ""}</Text>
        </View>

        <View style={styles.headerSection}>
          <View style={styles.headerDivider} />
          <View style={styles.headerLeft}>
            <View style={styles.headerRow}>
              <Text style={styles.headerLabel}>Receipt Number</Text>
              <Text style={styles.headerValue}>{data.receiptNumber || data.invoiceNumber || ""}</Text>
            </View>
            <View style={styles.headerRow}>
              <Text style={styles.headerLabel}>Receipt Date</Text>
              <Text style={styles.headerValue}>{data.receiptDate || ""}</Text>
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
            <Text style={styles.billingHeader}>Received From</Text>
            <Text style={styles.billingText}>{data.billedTo?.name || ""}</Text>
            <Text style={styles.billingText}>{data.billedTo?.contact || ""}</Text>
            <Text style={styles.billingText}>{data.billedTo?.address || ""}</Text>
            {data.customFields?.client && data.customFields.client.length > 0 && (
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

          <View style={styles.billingColumn}>
            <Text style={styles.billingHeader}>Received By</Text>
            <Text style={styles.billingText}>{data.billedBy?.name || ""}</Text>
            <Text style={styles.billingText}>{data.billedBy?.contact || ""}</Text>
            <Text style={styles.billingText}>{data.billedBy?.address || ""}</Text>
            {data.customFields?.company && data.customFields.company.length > 0 && (
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
              <Text style={styles.itemPrice}>{data.symbol || "$"} {(item.price || 0).toFixed(2)}</Text>
              <Text style={styles.itemTotal}>{data.symbol || "$"} {((item.qty || 0) * (item.price || 0)).toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.calculationSection}>
          <View style={styles.calculationContainer}>
            <View style={styles.calculationRow}>
              <Text style={styles.calculationLabel}>Total Due</Text>
              <Text style={styles.calculationValue}>{data.symbol || "$"} {total.toFixed(2)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Payment Received</Text>
              <Text style={styles.totalValue}>{data.symbol || "$"} {(data.receivedAmount ?? total).toFixed(2)}</Text>
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
              {data.signatureImage && <Image src={data.signatureImage} style={styles.signature} />}
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

export default ReceiptPDFTemplate;


