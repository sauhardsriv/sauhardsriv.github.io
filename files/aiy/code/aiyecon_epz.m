% This function solves for the policy function of assets in a Hugget-Aiyagari
% economy with Epsten-Zin Preferences.

function [ga] = aiyecon_epz(beta, R, gamma, rho, phi, nshocks, Pi, Y, na, ahatmin, ahatmax)

Yhat     = Y-(R-1)*phi;                                           % modified Y
ahatgrid = linspace(ahatmin,ahatmax,na)';                         % assets choice today
zprime   = repmat(R*ahatgrid, 1, nshocks) + repmat(Yhat', na,1);  % CIH tomorrow

c  = zprime;                         % initial guess of c tomorrow
V  = (1-beta)*c;                     % initial guess of value function
dV = nan(na, nshocks);

ahatpolicy  = zeros(na, nshocks);
VNew        = nan(na, nshocks);

diff = 1;
iter = 0;

% VFI using EGM
while diff > 1e-7

    iter=iter+1;

    ppV=cell(1,nshocks);
    for j=1:nshocks
        ppV{j} = griddedInterpolant(zprime(:,j), V(:,j), "spline", "spline");
        dV(:,j) = der(ppV{j}, zprime(:,j));
    end


    %Emuc = beta*R* ((1-gamma)^-1) * (dV.*(V.^((psi+gamma-1)/(1-gamma))))*Pi';

    % Expected marginal utility
    Emuc = beta*R* (((V.^(-gamma)).*dV)*Pi') .* ((V.^(1-gamma))*Pi').^((rho+gamma-1)/(1-gamma));
    c    = (Emuc/(1-beta)).^(1/(rho-1));                   % Euler Equation
    z    = c + repmat(ahatgrid, 1, nshocks);               % CIH today

    % Avoid Extrapolation
    %     if max(z,[],'all')<max(zprime,[],'all')
    %         error("Error: Extrapolation needed, expand asset grid")
    %     end


    %VNewe = ((1-beta)*c.^psi + beta* (V.^(psi/(1-gamma)))*Pi').^((1-gamma)/psi);

    VNewe = ((1-beta)*c.^rho + beta* ((V.^(1-gamma))*Pi').^(rho/(1-gamma))).^(1/rho);

    for j=1:nshocks
        ppV2 = griddedInterpolant(z(:,j), VNewe(:,j), 'spline', 'spline');
        VNew(:,j) = ppV2(zprime(:,j));
    end

    diff = max(max(abs(V-VNew)./(1+abs(V))));
    V = VNew;

end


for j=1:nshocks
    ppga = griddedInterpolant(z(:,j), ahatgrid, "spline", "spline");
    ahatpolicy(:,j) = ppga(zprime(:,j));
end

% Borrowing constraints
ahatpolicy(ahatpolicy<0) = 0;

% Normalize in terms of Phi
xgrid   = zprime-phi;      % CIH
apolicy = ahatpolicy-phi;  % Policy function in terms of CIH: g(x,s)
agrid   = (xgrid - repmat(Y', na, 1))/R;


% Obtain policy function in terms of assets g(a,s)
ga=cell(1,nshocks);
for j=1:nshocks
    ga{j} = griddedInterpolant(agrid(:,j), apolicy(:,j), "spline", "spline");
end

end