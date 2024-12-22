---
slug: "/c-practice"
date: "2019-06-29 16:53"
title: "C语言小练习"
type: "blogs"
tags: ["Small Practice"]
home_image: "https://www.techworm.net/programming/wp-content/uploads/2018/09/c-programming-1.png"
description: "最近朋友问了几道关于C语言的题目,所幸花了一个晚上写了一下"
---

## C语言小练习
最近朋友问了几道关于C语言的题目,所幸花了一个晚上写了一下,问题如下:
### 1.一只老鼠咬坏了账本,公式中[]代表被老鼠咬掉的地方。要想恢复下面的等式,应在[]中填上哪个相同的数字?

### 2.要求编制一个求方程ax2 + bx + c = 0的根的程序.一次可以求解多个方程的根,采用循环结构当次循环输入一个方程的系数a,b和c,输出求出的根.求解时考虑4种情况
	1.系数a为0,不是二次方程
	2.方程有两个不同的实数根
	3.方程有两个相同的实数根
	4.方程有两个虚根

### 3.这是一道侦探题.一辆汽车撞人后逃跑.四个目击者提供以下线索:
	甲:牌照三,四位相同;
	乙:牌号为31XXXX;
	丙:牌照五,六位相同;
	丁:三~六位是一个整数的平方;

	为了从这些线索中求出牌照号码,只要求出后四位再加上31000即可.这四位又是前两位相同,后两位相同,互相不相同并且是某个整数的平方的数。
	可以仍然使用穷举法利用计算机的计算速度快的特点,把所有的可能的数都试探一下,从中找出符合条件的数。
	对于后面四位数,因为1000的平方根>31,所以穷举时不需要从1开始,而是从31开始寻找一个整数的平方

### 4.猴子吃桃问题.猴子第一天摘下若干个桃子,当即吃了一半,还不过瘾,又多吃了一个.第二天早上又将剩下的桃子吃掉一半,又多吃一个.以后每天早上都吃了前一天剩下的一半零一个.到了第十天早上在吃时,就只剩下一个桃子了.求第一天共摘了多少个桃子.
	这里采用递推算法,设第十天的桃子个数为 x = 1,则第九天的桃子数为(x + 1) * 2,共递9次就可以得到第一天猴子所摘桃子数.

### 5.函数原型1:void Diamond();		此函数调用Print_Diamond()函数，函数原型2:void Print_Diamond(int lines);	输出lines行钻石图形；
	本题要求编制打印以下图案的程序,要求任意输入行数(必须为奇数),图案被打印在屏幕的中心.
	例如行数为7的钻石图案如下:
					*
				*	*	*
			*	*	*	*	*
		*	*	*	* 	*	*	*
			*	*	*	*	*
				*	*	*
					*
	算法提示:通过观察图案组成的特点,可以把它分成两个部分;上面四行和下面三行
	上面按行数递增,下面按行数递减.欲将图案输出到屏幕中心,通过计算可知每一行的左边应该有多少个空格.在此基础上,对图案的上半部分第i行,先输出i个空格,然后输出 2i - 1 个 *.

### 6.请实现一个简单的计算器.实现两个整数简单的加减乘除四则运算(假定除法为整除)。输入数据在express.txt中,计算结果写入另一个文件result.txt
	算法提示:打开数据文件express.txt,按顺序一次读入每一行表达式中的两个运算量和一个运算符
	根据运算符确定执行哪一种运算,计算后将结果在屏幕上显示,同时将结果写入结果数据文件result.txt

源代码如下：
```
#include<stdio.h>
#include<math.h>
#include<stdlib.h>
void mainmenu() {
	printf("			*******************************************************\n");
	printf("						1.FindNum\n");
	printf("						2.FindRoot\n");
	printf("						3.Detective\n");
	printf("						4.Monkey\n");
	printf("						5.Diamond\n");
	printf("						6.Calculator\n");
	printf("						0.Goodbye\n");
	printf("			*******************************************************\n");
}

void FindNum() {
	//一只老鼠咬坏了账本,公式中[]代表被老鼠咬掉的地方.
	//要想恢复下面的等式,应在[]中填上哪个相同的数字?
	//3[] * 6237 = []3 * 3564
	int i,leftnum,rightnum;				//leftnum 表示左边表达式运算的值,rightnum表示右边
	for(i = 0;i<=9;i++)					//0-9开始遍历
	{
		leftnum = (30 + i) * 6237;
		rightnum =(i * 10 + 3) * 3564;
		if (leftnum == rightnum)
		{
			printf("这个数字是:%d\n",i);
		}
	}
}

void FindRoot() {
	//要求编制一个求方程ax2 + bx + c = 0的根的程序.一次可以求解多个方程的根,采用循环结构
	//当次循环输入一个方程的系数a,b和c,输出求出的根.求解时考虑4种情况
	//	1.系数a为0,不是二次方程			2.方程有两个不同的实数根
	//	3.方程有两个相同的实数根		4.方程有两个虚根
	int a,b,c,delta;	
	float x1,x2;
	printf("请输入二次方程的各系数a,b,c,中间以空格分开\n");
	scanf("%d%d%d",&a,&b,&c);
	delta = b*b - 4 * a * c;
	if(a == 0) {
		printf("此方程不是一个二次方程\n");
	} else if(delta > 0) {
		x1 = (-b + sqrt(delta))/(2 * a);
		x2 = (-b - sqrt(delta))/(2 * a);
		printf("此方程有两个不同的是数根,分别为: x1 = %f	x2 = %f\n",x1,x2);
	} else if (delta == 0) {
		x1 = -b/(2 * a);
		printf("此方程有两个相同的实数根:x1 = x2 = %f\n",x1);
	} else {
		x1 = -b /(2*a);								//保留实部
		x2 = sqrt(-delta)/(2*a);					//保留虚部
		printf("此方程无实数根,有两个复数根,分别为 x1 = %f,x2 = %f\n",x1,x2);
	}
}

void Detective() {
	//这是一道侦探题.一辆汽车撞人后逃跑.四个目击者提供以下线索:
	//甲:牌照三,四位相同;				乙:牌号为31XXXX;
	//丙:牌照五,六位相同;				丁:三~六位是一个整数的平方;
	//为了从这些线索中求出牌照号码,只要求出后四位再加上31000即可.这四位又是前两位相同,后两位相同,互相不相同并且是某个整数的平方的数.可以仍然使用穷举法利用计算机的计算速度快的特点,把所有的可能的数都试探一下,从中找出符合条件的数.
	//对于后面四位数,因为1000的平方根>31,所以穷举时不需要从1开始,而是从31开始寻找一个整数的平方
	int i,num,middle,later;
	for(middle = 0;middle < 9;middle++)						//middle表示中间两位的数
		for(later = 0;later < 9;later++)					//later表示后两位
		{
			num = middle * 1000 + middle * 100 + later * 10 + later;
			for(i = 31;i < 100;i++)
			{
				if(num == i*i)
						printf("车的牌照号码是:%d\n",310000+num);
			}
		}
}

void Monkey() {
	//猴子吃桃问题.猴子第一天摘下若干个桃子,当即吃了一半,还不过瘾,又多吃了一个.第二天早上又将剩下的桃子吃掉一半,又多吃一个.以后每天早上都吃了前一天剩下的一半零一个.到了第十天早上在吃时,就只剩下一个桃子了.求第一天共摘了多少个桃子.
	//这里采用递推算法,设第十天的桃子个数为 x = 1,则第九天的桃子数为(x + 1) * 2,共递9次就可以得到第一天猴子所摘桃子数.
	int i;
	int	peach = 1;						//第10天剩下了一个桃子
	for(i = 9;i > 0;i--)
	{
		peach = peach +1;
		peach = peach * 2;
	}
	printf("第一天猴子所摘的桃子个数为:%d\n",peach);
}

 void Print_Diamond(int lines) {
	int i;
	for(i = 1;i <= lines;i++) {
		printf("	*");
	}
 }

void Diamond() {
//函数原型1:void Diamond();		此函数调用Print_Diamond()函数
//函数原型2:void Print_Diamond(int lines);	输出lines行钻石图形
//本题要求编制打印以下图案的程序,要求任意输入行数(必须为奇数),图案被打印在屏幕的中心.
//例如行数为7的钻石图案如下:
//							*
//						*	*	*
//					*	*	*	*	*
//				*	*	*	* 	*	*	*
//					*	*	*	*	*
//						*	*	*
//							*
//算法提示:通过观察图案组成的特点,可以把它分成两个部分;上面四行和下面三行
//上面按行数递增,下面按行数递减.欲将图案输出到屏幕中心,通过计算可知每一行的左边应该有多少个空格.在此基础上,对图案的上半部分第i行,先输出i个空格,然后输出 2i - 1 个 *.
	int line,i,j,k,middle,space = 48;				//space表示空格数
	printf("请输入要输入的行数\n");
	scanf("%d",&line);
	middle = line/2 + 1;							
	for(i = 1;i <= middle;i++,space -= 6) {			//前半部分输出
		for(k = 0;k < space;k++)				
			printf(" ");
		Print_Diamond(i*2 - 1);
		printf("\n");
	}
	space += 6;
	for(j = middle-1;j > 0;j--,space += 6) {		//后半部分输出
		for(k = 0;k < space;k++)
			printf(" ");
		printf("	");
		Print_Diamond(j*2 - 1);
		printf("\n");
	}
}

//请实现一个简单的计算器.实现两个整数简单的加减乘除四则运算(假定除法为整除).
//输入数据在express.txt中,计算结果写入另一个文件result.txt
//算法提示:打开数据文件express.txt,按顺序一次读入每一行表达式中的两个运算量和一个运算符
//根据运算符确定执行哪一种运算,计算后将结果在屏幕上显示,同时将结果写入结果数据文件result.txt
void Calculator() {
    FILE *fin, *fout;
    int oprand1,oprand2,result; 
    char oprator;
    fin = fopen("express.txt","r");
    fout = fopen("result.txt","w");
    if(!fin) {
        printf("读入文件出错！\n");
        exit(0);
    }
    if(!fout) {
        printf("写入文件出错！\n");
        exit(0);
    }
    while((fscanf(fin,"%d%c%d",&oprand1,&oprator,&oprand2))!=EOF) {
        switch(oprator)
        {
            case '+':
                result = oprand1 + oprand2;
                fprintf(fout,"%d%c%d=%d\n",oprand1,oprator,oprand2,result);
                break;
            case '-':
                result = oprand1 - oprand2;
                fprintf(fout,"%d%c%d=%d\n",oprand1,oprator,oprand2,result);
                break;
            case '*':
                result = oprand1 * oprand2;
                fprintf(fout,"%d%c%d=%d\n",oprand1,oprator,oprand2,result);
                break;
            case '/':
                result = oprand1 / oprand2;
                fprintf(fout,"%d%c%d=%d\n",oprand1,oprator,oprand2,result);
                break;
        }
    }
    fclose(fin);
    fclose(fout);
	printf("文件写入完成...\n");
	printf("输出文件的结果为:\n");
	FILE *fp;
	fp = fopen("result.txt","r");
	char ch;
	while((ch = fgetc(fp)) != EOF)
			putchar(ch);
	fclose(fp);
}


void Goodbye() {
	printf("            *******************************************************\n");
	printf("\n\n\n\n\n\n\n");
	printf("	                        Goodbye");
	printf("\n\n\n\n\n\n\n");
	printf("            *******************************************************\n");
}

void wait() {
	char ch;
	printf("\n\n\n\n\n\n\n\n\n\n\n 请按任意键继续...\n");
	scanf("%c",&ch);
	ch = getchar();
}

int main() {
	int choose;
	while(1)
	{
		mainmenu();
		printf("请输入要查看的题目的序号:");
		scanf("%d",&choose);
		system("clear");
		switch(choose)
		{
			case 1: FindNum();
				wait();
				system("clear");
				break;
			case 2: FindRoot();
				wait();
				system("clear");
				break;
			case 3: Detective();
				wait();
				system("clear");
				break;
			case 4: Monkey();
				wait();
				system("clear");
				break;
			case 5: Diamond();
				wait();
				system("clear");
				break;
			case 6: Calculator();
				wait();
				system("clear");
				break;
			case 0: Goodbye();
				exit(0);
			}
	}
	return 0;
}
```
