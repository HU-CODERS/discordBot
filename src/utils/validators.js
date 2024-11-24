export function validateFirstPartData(data) {
    const { head, active } = data;
    return ['si', 'no'].includes(head.toLowerCase()) && 
           ['si', 'no'].includes(active.toLowerCase());
  }