
% (c) Lilia Maliar, Serguei Maliar and Fernando Valli (2008)
% Modified and used with appropriate open use license.

function [idshock,agshock]  = shocksim(prob,T,N)

idshock=zeros(T,N); % matrix of idiosyncratic shocks
agshock=zeros(T,1); % vector of aggregate shocks



% Transition probabilities between the aggregate states

% prob_ag(i,j) is the probability of tomorrow's agg. shock (i=1,2) given
% today's agg. shock (j=1,2)

prob_ag=zeros(2,2);
prob_ag(1,1)=prob(1,1)+prob(1,2); prob_ag(2,1)=1-prob_ag(1,1);
prob_ag(2,2)=prob(3,3)+prob(3,4); prob_ag(1,2)=1-prob_ag(2,2);


% Probability of an idiosyncratic shock epsilon' given that aggregate shock
% s' is realized;

% p_xy_zw is the probability of idiosyncratic shock epsilon'=w conditional
% on aggregate shocks s'=y, s=x and idiosyncratic shock epsilon=z

p_bb_uu = prob(1,1)/prob_ag(1,1);
p_bb_ee = prob(2,2)/prob_ag(1,1);
p_bg_uu = prob(1,3)/prob_ag(1,2);
p_bg_ee = prob(2,4)/prob_ag(1,2);
p_gb_uu = prob(3,1)/prob_ag(2,1);
p_gb_ee = prob(4,2)/prob_ag(2,1);
p_gg_uu = prob(3,3)/prob_ag(2,2);
p_gg_ee = prob(4,4)/prob_ag(2,2);



% Generation of the aggregate shocks

stream = RandStream.create('threefry4x64_20','NumStreams',N+1,'StreamIndices',N+1);

ragshock = rand(stream, T-1, 1);

agshock(1) =1;

for t=2:T
    raux=ragshock(t-1);

    if agshock(t-1)==1

        if raux<=prob_ag(1,1)
            agshock(t)=1; %
        else
            agshock(t)=2;
        end

    else
        if raux<=prob_ag(2,2)
            agshock(t)=2; %
        else
            agshock(t)=1;
        end

    end
end

% rng default
%  mc = dtmc(prob_ag);
%  agshock = simulate(mc, T-1, "X0", [1, 0]);


% Generation of the idiosyncratic shocks for all agents in the first period
c1 = 0.9*N;
idshock(1,(1:c1))=2;
idshock(1,(c1+1:end))=1;

% Generation of the idiosyncratic shocks for all agents starting from the
% second period

for i =1:N
    stream = RandStream.create('threefry4x64_20','NumStreams',N+1,'StreamIndices',i);
    ridshock = rand(stream, T-1, 1);

    for t=2:T

        raux = ridshock(t-1);


        if agshock(t-1)==1 && agshock(t)==1 % if the previous agg. shock was bad
            % and the current agg. shock is bad


            if idshock(t-1,i)==1 % if the previous idiosyncratic shock was 1
                if raux<=p_bb_uu
                    idshock(t,i)=1;
                else
                    idshock(t,i)=2;
                end
            else                 % if the previous idiosyncratic shock was 2
                if raux<=p_bb_ee
                    idshock(t,i)=2;
                else
                    idshock(t,i)=1;
                end
            end
        end


        if agshock(t-1)==1 && agshock(t)==2 % if the previous agg. shock was bad
            % and the current agg. shock is good

            if idshock(t-1,i)==1
                if raux<=p_bg_uu
                    idshock(t,i)=1;
                else
                    idshock(t,i)=2;
                end
            else
                if raux<=p_bg_ee
                    idshock(t,i)=2;
                else
                    idshock(t,i)=1;
                end
            end
        end


        if agshock(t-1)==2 && agshock(t)==1 % if the previous agg. shock was good
            % and the current agg. shock is bad

            if idshock(t-1,i)==1
                if raux<=p_gb_uu
                    idshock(t,i)=1;
                else
                    idshock(t,i)=2;
                end
            else
                if raux<=p_gb_ee
                    idshock(t,i)=2;
                else
                    idshock(t,i)=1;
                end
            end
        end


        if agshock(t-1)==2 && agshock(t)==2 % if the previous agg. shock was good
            % and the current agg. shock is good

            if idshock(t-1,i)==1
                if raux<=p_gg_uu
                    idshock(t,i)=1;
                else
                    idshock(t,i)=2;
                end
            else
                if raux<=p_gg_ee
                    idshock(t,i)=2;
                else
                    idshock(t,i)=1;
                end
            end
        end
    end
end
