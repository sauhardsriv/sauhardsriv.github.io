%% *ECON 8185-002 Homework 6*
%  Sauhard Srivastava
%  <mailto:sriva238@umn.edu> 

%%
%
% This code solves demonstrates the Krusell-Smith (1998) algorithm and
% attempts to solve for the true law of motion of aggregate capital stock.

%% Setup and Simulation

clear; clc;
clear global
global alpha beta delta gamma kmin kmax nk nshocks Pi lbar zgrid epsilongrid Lgrid

pisolver;
alpha = 0.36;
beta  = 0.99;
delta = 0.025;
gamma = 1;

kmin = 0;
kmax = 50;
nk   = 200;
nshocks = 4;

lbar = 0.309629151147407;
zgrid = [0.99,0.99,1.01,1.01];
epsilongrid = [0,1,0,1];
Lgrid = lbar*[0.9, 0.9, 0.96, 0.96];

% Pi = [0.525 0.35 0.03125 0.09375
%     0.038889 0.836111 0.002083 0.122917
%     0.09375 0.03125 0.291667 0.583333
%     0.009115 0.115885 0.024306 0.850694];

% Naive Guess
% A0 = [0, 1];
% B0 = [0, 1];

% KS Guess
A0 = [0.085,0.965];
B0 = [0.095,0.962];

% Updated intellectual guess (for quick solution)
% A0 = [0.0825294515974148	0.964474825578200];
% B0 = [0.0915859084685512	0.962929882459104];


Kinitial = 11;
% exp(A0(1)/(1-A0(2)));
%((alpha*beta*0.99)/(1-beta*(1-delta)))^(1/(1-alpha));

A = A0;
B = B0;

Nsim = 5000;
Tsim = 11000;
[idshock,agshock] = shocksim(Pi, Tsim, Nsim);

ksim = zeros(Tsim+1, Nsim);
ksim(1,:) = Kinitial;

for t= 1:Tsim
    if agshock(t) ==2
        idshock(t,:)=idshock(t,:)+2;
    end
end

iter = 0;
diff = 1;
R2g = 0.8;
R2b = 0.8;

KP = nan(Tsim+1, 1);
KP(1)=Kinitial;

tic;
while (true)

    iter = iter+1;

    gk = kspolicy(A0, B0);

    for t =1:Tsim

        if agshock(t)==1
            KP(t+1) = (A0*[1; log(KP(t))]);
            KP(t+1) = exp(KP(t+1));
        else
            KP(t+1) = (B0*[1; log(KP(t))]);
            KP(t+1) = exp(KP(t+1));
        end

        kmean(t,1) = mean(ksim(t,:));

        for j=1:nshocks

            [colsj] = find(idshock(t, :)==j);
            ksim(t+1,colsj) = gk({ksim(t,colsj)', j, kmean(t,1)});

        end
    end

    ksim(ksim<1e-16)=0;

    ksmean = mean(ksim, 2);
    [rowsb] = find(agshock==1);
    [rowsg] = find(agshock==2);
    rowsb = rowsb(rowsb>500);
    rowsg = rowsg(rowsg>500);


    xb = log(ksmean(rowsb));
    yb = log(ksmean(rowsb+1));
    xg = log(ksmean(rowsg));
    yg = log(ksmean(rowsg+1));

    [A0new,~,resb,~,statsb(iter,:)] = regress(yb, [ones(numel(xb),1), xb]);
    [B0new,~,resg,~,statsg(iter,:)] = regress(yg, [ones(numel(xg),1), xg]);


    diff = max(max(abs(A0new'-A0)), max(abs(B0new'-B0))) ;

    if diff<1e-7
        A0final =A0new;
        B0final =B0new;
        statsbfinal = statsb(iter,:);
        statsgfinal = statsg(iter,:);
        A = [A; A0new'];
        B = [B; B0new'];
        fprintf('iter=%d  minR2=%0.6f diff= %0.6f \n', iter, min(R2g, R2b), diff)
        fprintf('diff Tolerance achieved \n')
        break
    end

    A0 = 0.3*A0new'+ 0.7*A0;
    B0 = 0.3*B0new'+ 0.7*B0;

    A = [A; A0];
    B = [B; B0];

    R2b = statsb(iter, 1);
    R2g = statsg(iter, 1);
    zz(iter,1)= mean(ksmean(1001:end));

    erg0 = exp(A0(1)/(1-A0(2)));
    erg1 = exp(B0(1)/(1-B0(2)));

    fprintf('iter=%d  minR2=%0.6f diff= %0.6f \n', iter, min(R2g, R2b), diff)

end
toc


%% Plots and Results

% Policy Function Plot
kgrid = linspace(0, 25, 100)';
kpr = gk({kgrid, [3,4] , 11.7});

fh = figure();
hold on;
plot(kgrid, kpr)
plot(kgrid, kgrid, LineStyle=":", Color='k')
hold off;
xlim([0, 25])
ylim([-0.5, 25])
xlabel('$k_t$', Interpreter='latex')
ylabel('$k_{t+1}$', Interpreter='latex')
h=title('\textbf{Assets Policy function}, $z=z_g$, $K=11.7$', 'interpreter', 'latex');

% Aggregate Law of motion Plot
fh = figure();
hold on;
scatter(exp(xb), exp(yb), 0.5)
scatter(exp(xg), exp(yg), 0.5)
plot((0:12), (0:12), LineStyle="--", Color='k')
hold off;
xlim([10.3, 11.7])
legend('$z=z_b$', '$z=z_g$', '', 'interpreter', 'latex', Location='best')
xlabel('$K_t$', Interpreter='latex')
ylabel('$K_{t+1}$', Interpreter='latex')
h=title('\textbf{Tomorrow''s vs. today''s aggregate capital}', 'interpreter', 'latex');

% Fundamental Accuracy Plot
time = (0:2000);
fh= figure();
plot(time, KP(9001:end), LineWidth=1.2)
hold on;
plot(time, ksmean(9001:end), LineWidth=0.8);
hold off;
xlim([0, 2000])
xlabel('time', Interpreter='latex')
legend('actual', 'perceived', location='best')
h=title('\textbf{den Haan''s fundamental accuracy plot}', 'interpreter', 'latex');
fh.Position = [100 100 1080 540];

% Gini Coefficients
blast = find(agshock == 1, 1, 'last');
glast = find(agshock == 2, 1, 'last');
distribw = [ksim(blast,:); ksim(glast,:)];
distribw = mean(distribw, 1);


Rfun = @(z, K, L)(alpha*z.*((K./L).^(alpha-1)) + (1-delta));
wfun = @(z, K, L)(1-alpha)*z.*((K./L).^(alpha));

Kb = mean(ksim(blast, :));
Kg = mean(ksim(glast, :));
Lg = lbar*0.96;
Lb = lbar*0.9;
Rb = Rfun( 0.99, Kb, Lb);
Rg = Rfun( 1.01, Kg, Lg);
wb = wfun(0.99, Kb, Lb);
wg = wfun(1.01, Kg, Lg);

epsg = nan(1, 5000);
epsb = nan(1, 5000);

colsub = find(idshock(blast,:)==1);
colseb = find(idshock(blast,:)==2);

colsug = find(idshock(glast,:)==3);
colseg = find(idshock(glast,:)==4);

epsb(1, colsub) = 0;
epsb(1, colseb) = 1;

epsg(1, colsug) = 0;
epsg(1, colseg) = 1;

incb = Rb.*ksim(blast, :) + wb*lbar.*epsb;
incg = Rg.*ksim(glast, :) + wg*lbar.*epsg;

conb = incb - ksim(blast+1,:);
cong = incb - ksim(glast+1,:);

distribc = [conb; cong];
distribc = mean(distribc, 1);

distribi = [incb; incg];
distribi = mean(distribi, 1);


pct_w = prctile(distribw, (0:100))';
pct_i = prctile(distribi, (0:100))';
pct_c = prctile(distribc, (0:100))';
for iw = 1:numel(pct_w)
    wealthshare(iw,1) = 100*sum(distribw(distribw<=pct_w(iw)))/sum(distribw);
    incshare(iw,1) = 100*sum(distribi(distribi<=pct_i(iw)))/sum(distribi);
    conshare(iw,1) = 100*sum(distribc(distribc<=pct_c(iw)))/sum(distribc);
end

pplorenz_w = pchip((0:100)', wealthshare);
pplorenz_i = pchip((0:100)', incshare);
pplorenz_c = pchip((0:100)', conshare);

ar_w = integral(@(x) ppval(pplorenz_w,x),0,100);
ar_i = integral(@(x) ppval(pplorenz_i,x),0,100);
ar_c = integral(@(x) ppval(pplorenz_c,x),0,100);
gini_w = (5000-ar_w)/5000;
gini_i = (5000-ar_i)/5000;
gini_c = (5000-ar_c)/5000;

shareeval = [99, 95, 90, 80, 70];
for j = 1:5
    shares(1,j) = 100 - ppval(pplorenz_w, shareeval(j));
    shares(2,j) = 100 - ppval(pplorenz_i, shareeval(j));
    shares(3,j) = 100 - ppval(pplorenz_c, shareeval(j));
end

% Lorenz Curve for Wealth
fh= figure();
plot((0:100)', wealthshare, LineWidth=1.2 )
hold on;
plot((0:100)', (0:100)', LineStyle="--",  Color='k');
hold off;
grid on
h =title('\textbf{Lorenz Curve for Wealth}', 'interpreter', 'latex');

% Wealth Distribution
fh = figure();
hist = histogram(distribw, 100, 'Normalization','probability');
hist.EdgeColor = 'none';
hist.FaceColor = "#000000";
h =title('\textbf{Marginal Density of Wealth}', 'interpreter', 'latex' );
xlim([0 inf])
grid on


