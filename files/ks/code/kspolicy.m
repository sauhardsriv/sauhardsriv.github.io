function [gk] = kspolicy(A0, B0)

global alpha beta delta gamma kmin kmax nk nshocks Pi lbar zgrid epsilongrid Lgrid


Rfun = @(z, K, L)(alpha*z.*((K./L).^(alpha-1)) + (1-delta));
wfun = @(z, K, L)(1-alpha)*z.*((K./L).^(alpha));

l = epsilongrid*lbar;

kgrid = linspace(0,1,nk)';
kgrid = kmin+(kmax-kmin)*kgrid.^3;

nK =21;
Kgrid = linspace(10, 12, nK)';

kpolicy = 0.9*(repmat(kgrid,1, nshocks,nK));


diff =1;
iter =0;

while diff>1e-8

    iter = iter+1;
    ppk = griddedInterpolant({kgrid, [1,2,3,4],Kgrid}, kpolicy, "spline", "linear");

    for iK = 1:nK

        K = Kgrid(iK);

        Kprime1 = exp((A0*[1; log(K)]));
        Kprime2 = exp((B0*[1; log(K)]));

        Kprimegrid = [ones(1,2)*Kprime1, ones(1,2)*Kprime2];

        R = Rfun(zgrid, K, Lgrid);
        w = wfun(zgrid, K, Lgrid);

        for j = 1:nshocks

            Knext = Kprimegrid(j);
            Rprime = Rfun(zgrid, Knext, Lgrid);
            wprime = wfun(zgrid, Knext, Lgrid);
            k1 = ppk({kgrid, [1,2,3,4], Knext});
            Emuc(:,j,iK) = beta*(Rprime.*((Rprime.*kgrid + wprime.*l - k1).^(-gamma)))*Pi(j,:)';
        end

        c(:,:,iK) = Emuc(:,:,iK).^(-1/gamma);
        k0(:,:, iK) = (c(:,:,iK)+ kgrid - w.*l).*(1./R);
    end

    for iK = 1:nK
        for j = 1:nshocks
            pp2 = griddedInterpolant(k0(:,j, iK), kgrid, "spline", "linear");
            kpolicynew(:,j, iK) = pp2(kgrid);
        end
    end

    kpolicynew(kpolicynew<0)=0;
    diff = max(abs(kpolicynew-kpolicy), [], "all");
    kpolicy = kpolicynew;

end

gk = griddedInterpolant({kgrid, [1,2,3,4], Kgrid}, kpolicy, "spline", "linear");

end