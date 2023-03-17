% This function solves for the policy function of assets in a Hugget-Aiyagari
% economy with CRRA Preferences.

function [ga] = aiyecon(beta, R, gamma, phi, nshocks, Pi, Y, na, ahatmin, ahatmax)

Yhat     = Y-(R-1)*phi;                                           % modified Y
ahatgrid = linspace(0,1,na)';
ahatgrid = ahatmin+(ahatmax-ahatmin)*ahatgrid.^3;                 % saving today
zprime   = repmat(R*ahatgrid, 1, nshocks) + repmat(Yhat', na,1);  % CIH tomorrow

ahatpolicy    = zeros(na, nshocks);          % initial guess of policy function
ahatpolicynew = nan(na, nshocks);

diff = 1;
iter = 0;

% Policy Iteration using EGM
while diff > 1e-7

    iter=iter+1;

    Emuc = beta*R* ((zprime-ahatpolicy).^(-gamma))*Pi';    % Expected marginal utility
    c    = Emuc.^(-1/gamma);                               % Euler Equation
    z    = c + repmat(ahatgrid, 1, nshocks);               % CIH today

    % Avoid Extrapolation
    %     if max(z,[],'all')<max(zprime,[],'all')
    %         error("Error: Extrapolation needed, expand asset grid")
    %     end

    % Update Policy Function by iterpolating on the exogenous zprime grid
    for j=1:nshocks
        pp2 = griddedInterpolant(z(:,j), ahatgrid, "spline", "linear");
        ahatpolicynew(:,j) = pp2(zprime(:,j));
    end

    % Borrowing constraints
    ahatpolicynew(ahatpolicynew<0) = 0;

    diff = max(max(abs(ahatpolicynew-ahatpolicy)));
    ahatpolicy = ahatpolicynew;

    if min(min(zprime-ahatpolicy))<0
        error('Error: Expand Asset Grid')
    end

end

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