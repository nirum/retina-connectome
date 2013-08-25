% Convert cell type matrix into correspondence array
% Niru Maheswaranathan
% 5:49 PM Aug 24, 2013

%% cell types are provided in excel table in supp info 4,
%  this script converts them into a simple array

%% There are 77 cell types, each with an internal ID. output
%  of this script is a 77-element array which stores the
%  corresponding internal ID

%% load excel table
excelTable = csvread('../supplementary/celltypeCorrespondence.csv');

%% get out number of cell types, create correspondence array
numTypes = length(unique(excelTable(:,4)));
cellTypeCorrespondence = zeros(numTypes,1);

% also store the number of cells of each type
numCells = zeros(numTypes,1);

%% for each cell type, find correspondence
for j = 1:numTypes

    % find corresponding table indices
    indices = find(excelTable(:,4)==j);

    % get corresponding internal ids
    internal = excelTable(indices,3);

    % make sure that these are all the same (one-to-one correspondence)
    if var(internal) > 0
        error('Found a many-to-one correspondence for cell type #%i',j);
    end

    % store the corresponding value
    cellTypeCorrespondence(j) = internal(1);

    % store the number of cells of this type
    numCells(j) = length(internal);

    % update on progress
    progressbar(j,numTypes);

end
