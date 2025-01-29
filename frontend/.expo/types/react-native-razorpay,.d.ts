declare module 'react-native-razorpay' {
    export interface RazorpayOptions{
      key:string;
      amount:number;
      currency:string;
      name:string;
      description:string;
      order_id?:string;
      prefill?:{
        email?:string;
        contact?:string;
        name?:string;
      };
      theme?:{
        color?: string;
      };
    }
  
    export interface RazorpayPaymentSuccessResponse{
      razorpay_payment_id:string;
      razorpay_order_id?:string;
      razorpay_signature?:string;
    }
  
    export interface RazorpayPaymentErrorResponse {
      code:number;
      description:string;
    }
  
    export default class RazorpayCheckout{
      static open(options:RazorpayOptions):Promise<RazorpayPaymentSuccessResponse>;
    }
  }
  