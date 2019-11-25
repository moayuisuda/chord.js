
// 1
#define rGPBCON    (*(volatile unsigned *)0x56000010) //Port B control
#define rGPBDAT    (*(volatile unsigned *)0x56000014) //Port B data
#define rGPBUP     (*(volatile unsigned *)0x56000018) //Pull-up control B


#define  LED1_ON (rGPBDAT &=~(1<<3))
#define  LED1_OFF (rGPBDAT |=(1<<3) )
#define  LED2_ON (rGPBDAT &=~(1<<10))
#define  LED2_OFF (rGPBDAT |=(1<<10))

 

void Delay(void)
{
 int i;
 for(i=0;i<1000000;i++);
}

int Main()
{
 rGPBCON &=~((3<<6)|(3<<20));
 rGPBCON |=((1<<6)|(1<<20));
 rGPBUP &=~((1<<3)|(1<<10));
 rGPBDAT |=(1<<3)|(1<<10);
 
 while(1)
 {
  LED1_ON;Delay();LED1_OFF;
  LED2_ON;Delay();LED2_OFF;
 }
 return 0;
}



// 2
#define rGPBCON    (*(volatile unsigned *)0x56000010) //Port B control
#define rGPBDAT    (*(volatile unsigned *)0x56000014) //Port B data
#define rGPBUP     (*(volatile unsigned *)0x56000018) //Pull-up control B


#define  LED1_ON (rGPBDAT &=~(1<<3))
#define  LED1_OFF (rGPBDAT |=(1<<3) )
#define  LED2_ON (rGPBDAT &=~(1<<4))
#define  LED2_OFF (rGPBDAT |=(1<<4))
#define  LED3_ON (rGPBDAT &=~(1<<8))
#define  LED3_OFF (rGPBDAT |=(1<<8))
#define  LED4_ON (rGPBDAT &=~(1<<10))
#define  LED4_OFF (rGPBDAT |=(1<<10))

 

void Delay(void)
{
 int i;
 for(i=0;i<1000000;i++);
}

int Main()
{
 rGPBCON &=~((3<<6)|(3<<8)|(3<<16)|(3<<20));
 rGPBCON |=((1<<6)|(1<<8)|(1<<16)|(1<<20));
 rGPBUP &=~((1<<3)|(1<<4)|(1<<8)|(1<<10));
 rGPBDAT |=(1<<3)|(1<<4)|(1<<9)|(1<<10);
 
 while(1)
 {
  LED1_ON;Delay();LED1_OFF;
  LED2_ON;Delay();LED2_OFF;
  LED3_ON;Delay();LED3_OFF;
  LED4_ON;Delay();LED4_OFF;
 }
 return 0;
}