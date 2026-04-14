import { redirect } from "next/navigation";

const CV_PDF_PATH = "/Mania_Totomi_CV.pdf";

export default function CvPage() {
  redirect(CV_PDF_PATH);
}
