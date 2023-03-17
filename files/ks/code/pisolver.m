
syms x1 x3 x5 x7

eq1 = 0.04*(1/3)+ 0.96*x1 - 0.04;
eq3 = (0.04)*(0.6)*(1.25) + 0.96*x3 - 0.1;
eq5 = 0.1*0.6 + 0.9*x5 - 0.1;
eq7 = 0.1*0.75*(1/3) + 0.9*x7 - 0.04;

x1sol = solve(eq1, x1);
x3sol = solve(eq3, x3);
x5sol = solve(eq5, x5);
x7sol = solve(eq7, x7);

pi_bb = [0.6, 0.4;
    x5sol, 1-x5sol ];

pi_bg = [0.75*(1/3), 1- 0.75*(1/3);
    x7sol, 1-x7sol ];

pi_gb = [0.6*1.25, 1-0.6*1.25;
    x3sol, 1-x3sol ];

pi_gg = [1/3, 2/3;
    x1sol, 1-x1sol ];

Pi = [(7/8)*pi_bb, (1/8)*pi_bg;
    (1/8)*pi_gb,  (7/8)*pi_gg];

Pi = double(Pi);

clearvars x1 x3 x5 x7 eq1 eq3 eq5 eq7 x1sol x3 sol x5sol x7sol pi_bb pi_bg pi_gb pi_gg 

