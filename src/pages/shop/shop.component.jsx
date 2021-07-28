import React, { useEffect, lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';

import Spinner from '../../components/spinner/spinner.component';

import { selectIsCollectionFetching, selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner = WithSpinner(lazy(() => import('../../components/collections-overview/collections-overview.component')));

const CollectionPageWithSpinner = WithSpinner(lazy(() => import('../collection/collection.component')));

const ShopPage = ({ fetchCollectionsStartAsync, match, isCollectionFetching, IsCollectionsLoaded }) => {

  	useEffect(() => {
		fetchCollectionsStartAsync();
	}, [fetchCollectionsStartAsync]);

	return (
		<div className='shop-page'>
			<Suspense fallback={<Spinner />}>
				<Route
					exact
					path={`${match.path}`}
					render={props => (
						<CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props} />
					)}
				/>
				<Route
					path={`${match.path}/:collectionId`}
					render={props => (
						<CollectionPageWithSpinner isLoading={!IsCollectionsLoaded} {...props} />
					)}
				/>
			</Suspense>
		</div>
	);
}

const mapStateToProps = createStructuredSelector({
	isCollectionFetching: selectIsCollectionFetching,
	IsCollectionsLoaded: selectIsCollectionsLoaded
})

const mapDispatchToProps = dispatch => ({
	fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);