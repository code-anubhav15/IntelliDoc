
import xray from '../../assests/Xray.jpg';
import diaret from '../../assests/diabeticretinopathy.avif';
import retina from '../../assests/retina.jpg';
import diabetes from '../../assests/diabetes.webp';
import brain from '../../assests/brainstroke.jpg';
import blood from '../../assests/bloodtest.avif';
import cardio from '../../assests/cardio.jpg';
import liver from '../../assests/Liver.jpg';
import kidney from '../../assests/kidneystone.jpg';
export const tests = [
  {
    id: 1,
    img:xray,
    name: 'Skin Disease',
    path:'/skin-disease',
    description: 'Uses electromagnetic radiation to produce images of the inside of the body, helping to diagnose various conditions, injuries, or diseases.'
  },
  {
    id: 2,
    img:diaret,
    name: 'Diabetic Retinopathy',
    path:'/diabetic-retinopathy',
    description: 'Comprehensive eye exam, including dilation, fundus photography, optical coherence tomography (OCT), and fluorescein angiography.'
  },
  {
    id: 3,
    img:retina,
    name: 'CT Scan',
    path:'/ct-scan',
    description: 'Non-invasive diagnostic procedure that uses light to capture detailed images of the retina to detect and monitor various eye conditions.'
  },
  {
    id: 4,
    img:diabetes,
    name: 'Diabetes',
    path:'/diabetes',
    description: 'Evaluates blood glucose levels to diagnose diabetes or monitor blood sugar control, helping in early detection and management of the condition.'
  },
  {
    id: 5,
    img:brain,
    name: 'Cataract Disease',
    path:'/cataract',
    description: 'Assesses brain function and circulation for prompt diagnosis and treatment of strokes, critical for preventing long-term brain damage and disability.'
  },
  {
    id: 6,
    img:blood,
    name: 'Blood Test',
    path:'/bloodTest',
    description: 'Health insights by analyzing blood components like cells and biochemical markers, aiding in disease diagnosis and treatment monitoring'
  },
  {
    id: 7,
    img:cardio,
    name: 'CardioDisease',
    path:'/cardioDisease',
    description: 'Cardiovascular disease tests assess heart health, detecting conditions like heart disease and stroke risk factors through various diagnostic methods.'
  },
  {
    id: 8,
    img:liver,
    name: 'LiverDisease',
    path:'/liverDisease',
    description: 'Detects liver damage or disorders using blood tests, imaging studies, and sometimes liver biopsy for a compr assessment.'
  },
  {
    id: 9,
    img:kidney,
    name: 'Kidney Stone ',
    path:'/kidneyStone',
    description: 'Diagnoses the presence of kidney stones through  urine and blood tests to analyze mineral levels and kidney function.'
  },
  {
    id:10,
    img:liver,
    name:'Heart Disease',
    path:'/heart-disease',
    description:'Detects the presence of heart disease using blood tests, imaging studies, and sometimes heart biopsy for a comprehensive assessment.'
  }
];
