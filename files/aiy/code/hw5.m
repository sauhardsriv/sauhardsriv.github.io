%% *ECON 8185-002 Homework 5*
%  Sauhard Srivastava
%  sriva238@umn.edu

%%
% This code solves for the Stationary General Equilibrium of Aiyagari's (1994)
% Incomplete Markets model.

%% Setup and Simulation

clear; clc;

% Discretization
nshocks     = 19;                       % Number of states
varrho      = 0.95;                     % AR1 coeff
sigma       = 0.2;                      % SD of labor hours time-series
sigma_eps   = sigma*(1-varrho^2)^0.5;   % SD of epsilon
mu_eps      = 0.0;                      % Mean of the shock

[ln_l, Pi]  = rouwenhorst(nshocks,varrho, mu_eps, sigma_eps);

l           = exp(ln_l);                % labor endowment states

% Markov Chain Object
mc = dtmc(Pi);

% Limiting Distribution of the Markov Chain
PiErg = asymptotics(mc);

% Normalize labour endowments to so that average employment = 1 in the limiting distribution
l = l/(PiErg*l);

% Simulate the Markov Chain
Nsim = 50000;
Tsim = 499;
rem  = mod(Nsim, nshocks);
quo  = (Nsim-rem)/nshocks;

x0 = [quo*ones(1, nshocks-1), quo+rem];
ysim_indices = simulate(mc, Tsim, 'X0', x0);

lsim = l(ysim_indices);
barL = mean(lsim(end,:));


% Set Parameters
beta   = 0.96;              % discount factor
phi    = 0;                 % borrowing limit

alpha  = 0.36;              % Capital income share
delta  = 0.08;              % Depreciation
A      = 1;                 % TFP

w = @(R) ((alpha./(R-1+delta)).^(alpha/(1-alpha)))*A^(1/(1-alpha))*(1-alpha);
KR = @(R, L) L*((alpha*A*(R-1+delta).^-1)).^(1/(1-alpha));

na = 3000;                  % number of grid points
ahatmax = 525;              % maximum amount of savings, choose carefuly to ensure minimum possible extrapolation
ahatmin = 0;                % minimum saving


%% GE Solver

clc;

cse = 1;

% Toggle cse
% cse = 1 : CRRA pref gamma = 2
% cse = 2 : CRRA pref gamma = 10
% cse = 3 : EPZ pref  gamma = 2  rho = -1    (eis =0.5)
% cse = 4 : EPZ pref  gamma = 10 rho = -1    (eis =0.5)
% cse = 5 : EPZ pref  gamma = 2  rho = -9    (eis =0.2)
% cse = 6 : EPZ pref  gamma = 2  rho = -4    (eis =0.2)
% cse = 7 : EPZ pref  gamma = 2  rho = -0.25 (eis =0.8)
% cse = 8 : EPZ pref  gamma = 2  rho = 0.5   (eis =2.0)



switch cse
    case 1
        gamma = 2;  rho = 1-gamma;
    case 2
        gamma = 10; rho = 1-gamma;
    case 3
        gamma = 2;  rho = -1;
    case 4
        gamma = 10; rho = -1;
    case 5
        gamma = 2;  rho = -9;
    case 6
        gamma = 2;  rho = -4;
    case 7
        gamma = 2;  rho = -0.25;
    case 8
        gamma = 2;  rho = 0.5;
end


switch cse
    case {1, 2}
        solvepolicy = @(beta, R, gamma, rho , phi, nshocks, Pi, Y, na, ahatmin, ahatmax)aiyecon(beta, R, gamma, phi, nshocks, Pi, Y, na, ahatmin, ahatmax);

    case {3, 4, 5, 6, 7, 8}
        solvepolicy = @(beta, R, gamma, rho ,phi, nshocks, Pi, Y, na, ahatmin, ahatmax) aiyecon_epz(beta, R, gamma,rho, phi, nshocks, Pi, Y, na, ahatmin, ahatmax);
end

Rlow  = 1.01;
Rhigh = 1.0415;
Rgrid = linspace(Rlow, Rhigh, 9)';
barK  = nan(numel(Rgrid),1);
barA  = nan(numel(Rgrid),1);

for iR =1:numel(Rgrid)

    R = Rgrid(iR);
    Y = w(R)*l;
    ga = solvepolicy(beta, R, gamma, rho, phi, nshocks, Pi, Y, na, ahatmin, ahatmax);
    asim = sim(ga, nshocks, Nsim, Tsim, ysim_indices);

    barK(iR,1) = KR(R, 1);
    barA(iR,1) = mean(asim(end, :));

end

AKdiff = barK - barA;

if AKdiff(1)*AKdiff(end)>0
    if AKdiff(1)>0 && AKdiff(end)>0
        error("Increase Rhigh")
    elseif AKdiff(1)<0 && AKdiff(end)<0
        error("Decrease Rlow")
    end
end

dd=1;
geiter =numel(Rgrid);
while abs(dd)>1e-9

    geiter = geiter+1;

    if geiter>20
        error("GE not found adjust Rlow and Rhigh")
    end

    [AKdiff, ind] = sort(AKdiff, "ascend");
    Rgrid = Rgrid(ind);
    barK  = barK(ind);
    barA  = barA(ind);

    provR = interp1(AKdiff, Rgrid, 0, 'spline');
    provY = w(provR)*l;
    ga    = solvepolicy(beta, provR, gamma, rho, phi, nshocks, Pi, provY, na, ahatmin, ahatmax);
    asim  = sim(ga, nshocks, Nsim, Tsim, ysim_indices);
    provK = KR(provR, 1);
    provA = mean(asim(end, :));

    dd = provK-provA;

    AKdiff = [AKdiff; dd];
    Rgrid  = [Rgrid; provR];
    barK   = [barK; provK];
    barA   = [barA; provA];

end

rceR = provR;
rcew = w(rceR);
rceK = provK;
rceA = provA;
asimlast = asim(end, :);

[AKdiff, ind] = sort(AKdiff, "ascend");
Rgrid = Rgrid(ind);
barK  = barK(ind);
barA  = barA(ind);

%% Plots and Results

clc;

fh = figure();
title('Stationary Equilibrium Determination');
plot(barK, Rgrid, LineWidth=1)
hold on;
plot (barA, Rgrid, LineWidth=1)
hold on;
plot(rceK,rceR,'r.','markersize',8)
xlabel('Saving/Investment');
ylabel('R');
legend('K(R)', 'A(R)','Location','southoutside')
fh.Position = [100 100 540 540];
hold off;

fh = figure();
tiledlayout(1, 2)
nexttile
hist = histogram(asim(end, :),100, 'Normalization','probability');
hist.EdgeColor = 'none';
hist.FaceColor = "#000000";
title('Stationary Marginal Density of Wealth');
xlim([0 inf])
grid on

nexttile
cdf = cdfplot(asimlast);
title('Stationary Marginal Distribution of Wealth');
cdf.LineWidth = 1.2;
fh.Position = [100 100 1080 480];

pct = prctile(asimlast, (0:100))';
for iw = 1:numel(pct)
    wealthshare(iw,1) = 100*sum(asimlast(asimlast<=pct(iw)))/sum(asimlast);
end
lorenz = polyfit((0:100)', wealthshare, 6 );
intlor = polyint(lorenz);
ar = diff(polyval(intlor,[0 100]));
gini = (5000-ar)/5000;

fh= figure();
plot((0:100)', wealthshare, LineWidth=1.2)
hold on;
plot((0:100)', (0:100)', LineStyle="--",  Color='k');
hold off;
title('Lorenz Curve');


fprintf('--------------------------------------------\n ')
fprintf('Stationary General Equilibrium \n')
fprintf('R = %0.6f \n',rceR)
fprintf('W = %0.6f \n',w(rceR))
fprintf('K = %0.6f \n',rceK)
fprintf('A = %0.6f \n',rceA)
fprintf('L = 1 \n')
fprintf('Y = %0.6f \n',A*rceK^alpha)
fprintf('C = %0.6f \n',A*rceK^alpha - delta*rceK)
fprintf('Borrowing constrained population (%%) = %0.2f \n', 100*numel(asimlast(asimlast<1e-7))/Nsim )
fprintf('Wealth share of top 1%% (%%) = %0.2f \n', 100-wealthshare(end-1))
fprintf('Gini Coefficient = %0.2f \n', gini )
fprintf('--------------------------------------------\n ')

tvar = [rceR, w(rceR),rceK, rceA, 1,  A*rceK^alpha, A*rceK^alpha - delta*rceK, 100*numel(asimlast(asimlast<1e-7))/Nsim, 100-wealthshare(end-1), gini ]';


function [asim] = sim(ga, nshocks, Nsim, Tsim, ysim_indices)
asim = zeros(Tsim+1, Nsim);

for t =1:Tsim
    for j =1:nshocks
        asim(t+1, ysim_indices(t, :)==j) = ga{j}(asim(t, ysim_indices(t,:)==j));
    end
end

asim(asim<1e-16)=0;

end
